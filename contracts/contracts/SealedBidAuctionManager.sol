// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// NOTE: All currency is wei

contract SealedBidAuctionManager {
    // Q
    // H

    /**
     * types
     */

    enum AuctionState {Active, Success, Failure}

    struct UserSetAuctionInfo {
        address payable seller;
        // auction rules
        uint256 securityDeposit;
        uint256 reservePrice;
        // dates
        uint256 biddingStart; // or auctionStart
        uint256 revealStart; // or biddingEnd (???)
        uint256 revealEnd;
        // item
        string itemName;
        string itemDesc;
    }

    struct PublicAuctionInfo {
        uint256 auctionId;
        UserSetAuctionInfo userSet;
        AuctionState state;
    }

    struct Bid {
        // encrypted p || r
        // c
    }

    struct Auction {
        PublicAuctionInfo info;
        // protocol; redundant, but convenient
        uint32 highestBid;
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
     * events
     */

    event NewAuction(uint256 auctionId);
    event NewBid(address by);

    /**
     * modifiers
     */

    modifier duringBiddingPeriod(uint256 auctionId) {
        if (
            !(block.timestamp >=
                auctions[auctionId].info.userSet.biddingStart &&
                block.timestamp < auctions[auctionId].info.userSet.revealStart)
        ) revert("Bidding period has ended!");
        _;
    }

    modifier afterAuctionEnded(uint256 auctionId) {
        if (!(block.timestamp >= auctions[auctionId].info.userSet.revealEnd))
            revert("Auction has not ended yet!");
        _;
    }

    modifier newBidder(uint256 auctionId) {
        if (
            auctions[auctionId].info.userSet.seller == msg.sender ||
            auctions[auctionId].bids[msg.sender] != 0
        ) revert("Sender is either the seller or has already placed a bid!");
        _;
    }

    modifier existingBidder(uint256 auctionId) {
        if (auctions[auctionId].bids[msg.sender] == 0)
            revert("Sender has not placed a bid!");
        _;
    }

    modifier onlySeller(uint256 auctionId) {
        if (msg.sender != auctions[auctionId].info.userSet.seller)
            revert("Sender is not the seller!");
        _;
    }

    modifier validAuctionId(uint256 auctionId) {
        if (auctionId >= auctions.length) revert("Invalid auction ID!");
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
        UserSetAuctionInfo memory auctionInfo
    ) external returns (uint256 auctionId) {
        // create an auctionId, then add to table
        auctionId = auctions.length;
        Auction storage auction = auctions.push();
        auction.info = PublicAuctionInfo({
            auctionId: auctionId,
            userSet: auctionInfo,
            state: Ongoing
        });
        emit NewAuction(auctionId);
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
        newBidder(auctionId)
        duringBiddingPeriod(auctionId)
    {
        // transfer security deposit to contract
        if (msg.value != auctions[auctionId].info.userSet.securityDeposit)
            revert("Sent deposit is not equal to required deposit!");
        // hash bid by address (FIXME: ??)
        // bytes32 b = hash(bid);
        auctions[auctionId].bids[msg.sender] = bid;
        emit NewBid(msg.sender);
    }

    // functions to be called after auction ends

    function withdrawDeposit(
        uint256 auctionId
    )
        external
        validAuctionId(auctionId)
        afterAuctionEnded(auctionId)
        existingBidder(auctionId)
    {
        // no re-entrancy attacks!
        auctions[auctionId].bids[msg.sender] = 0;
        payable(msg.sender).transfer(
            auctions[auctionId].info.userSet.securityDeposit
        );
    }

    function transferWinningBidToOwner(
        uint256 auctionId
    )
        external
        validAuctionId(auctionId)
        afterAuctionEnded(auctionId)
        onlySeller(auctionId)
    {
        // FIXME: "unhash" the bid
        auctions[auctionId].highestBidder.transfer(
            auctions[auctionId].highestBid
        );
    }
}
