// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// NOTE: All currenct is wei

contract SealedBidAuctionManager {
    /**
     * types
     */

    struct PublicAuctionInfo {
        uint256 auctionId;
        address payable seller;
        uint256 securityDeposit;
        // dates
        uint256 biddingStart; // or auctionStart
        uint256 revealStart; // or biddingEnd
        uint256 revealEnd;
        // item
        string itemName;
        string itemDesc;
    }

    struct Auction {
        PublicAuctionInfo info;
        // protocol
        uint32 highestBid; // redundant, but convenient
        address payable highestBidder; // keys into bids
        // participants
        mapping(address => uint32) bids;
        // bids are hashed using the bidder's public key.
        // this is hiding, and binding: committed.
    }

    /**
     * state variables
     */

    Auction[] private auctions;

    /**
     * time-aware modifiers
     */

    /**
     * error types
     */

    /// Bidding has ended!
    error NotDuringBiddingPeriod();

    /// Auction ID is invalid!
    error InvalidAuctionId();

    /// Desposit is not equal to required security deposit!
    error InvalidDeposit();

    /// Auction is still active!
    error AuctionHasNotEnded();

    /**
     * modifiers
     */

    modifier duringBiddingPeriod(uint256 auctionId) {
        if (
            !(block.timestamp >= auctions[auctionId].info.biddingStart &&
                block.timestamp < auctions[auctionId].info.revealStart)
        ) revert NotDuringBiddingPeriod();
        _;
    }

    modifier afterAuctionEnded(uint256 auctionId) {
        if (!(block.timestamp >= auctions[auctionId].info.revealEnd))
            revert AuctionHasNotEnded();
        _;
    }

    modifier newBidder(uint256 auctionId) {
        require(
            auctions[auctionId].bids[msg.sender] == 0,
            "bidder already exists!"
        );
        _;
    }

    modifier existingBidder(uint256 auctionId) {
        require(
            auctions[auctionId].bids[msg.sender] != 0,
            "bidder already exists!"
        );
        _;
    }

    modifier onlyBidder(uint256 auctionId) {
        require(
            msg.sender != auctions[auctionId].info.seller,
            "seller cannot bid!"
        );
        _;
    }

    modifier onlyOwner(uint256 auctionId) {
        require(
            msg.sender == auctions[auctionId].info.seller,
            "you must be the seller to do this!"
        );
        _;
    }

    modifier validAuctionId(uint256 auctionId) {
        if (auctionId >= auctions.length) revert InvalidAuctionId();
        _;
    }

    /**
     * external functions
     */

    // functions to be called at any time

    function getNumberOfRegisteredAuctions() external view returns (uint256) {
        return auctions.length;
    }

    function createAuction(
        PublicAuctionInfo memory auctionInfo
    ) external returns (uint256) {
        // create an auctionId, then add to table
        Auction storage auction = auctions.push();
        auction.info = auctionInfo;

        return auctions.length - 1;
    }

    function getAuctionData(
        uint256 auctionId
    )
        external
        view
        validAuctionId(auctionId)
        returns (PublicAuctionInfo memory)
    {
        return auctions[auctionId].info;
    }

    // functions to be called during bidding period

    function placeBid(
        uint256 auctionId,
        uint32 bid
    )
        external
        payable
        validAuctionId(auctionId)
        onlyBidder(auctionId)
        newBidder(auctionId)
        duringBiddingPeriod(auctionId)
    {
        // transfer security deposit to contract
        if (msg.value != auctions[auctionId].info.securityDeposit)
            revert InvalidDeposit();
        // hash bid by address (FIXME: ??)
        // bytes32 b = hash(bid);
        auctions[auctionId].bids[msg.sender] = bid;
    }

    // functions to be called after auction ends

    function withdrawDeposit(
        uint256 auctionId
    )
        external
        validAuctionId(auctionId)
        afterAuctionEnded(auctionId)
        onlyBidder(auctionId)
        existingBidder(auctionId)
    {
        auctions[auctionId].bids[msg.sender] = 0;
        payable(msg.sender).transfer(auctions[auctionId].info.securityDeposit);
    }

    function transferWinningBidToOwner(
        uint256 auctionId
    )
        external
        validAuctionId(auctionId)
        afterAuctionEnded(auctionId)
        onlyOwner(auctionId)
    {
        // FIXME: "unhash" the bid
        auctions[auctionId].highestBidder.transfer(
            auctions[auctionId].highestBid
        );
    }
}
