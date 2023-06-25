// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// NOTE: All currency is wei

// TODO: compute securityDeposit = minimumPrice * 0.02

contract SealedBidAuctionManager {
    /**
     * types
     */

    struct UserSetAuctionInfo {
        address payable seller;
        // auction rules
        uint256 securityDeposit; // FIXME
        uint256 minimumPrice;
        // dates
        uint256 biddingEndDate;
        uint256 confirmationEndDate;
        // item
        string itemName;
        string itemDesc;
        string itemPicture;
    }

    enum AuctionState {
        Active,
        Failure,
        Success,
        InConfirmation
    }

    struct PublicAuctionInfo {
        uint256 auctionId;
        UserSetAuctionInfo userSet;
        AuctionState state;
    }

    struct Auction {
        PublicAuctionInfo info;
        // protocol; redundant, but convenient
        uint32 highestBid;
        address payable highestBidder; // keys into bids
        // participants
        mapping(address => uint32) bids;

        // bids maps bidder to their pedersen-commited bid.
    }

    /**
     * state variables
     */

    Auction[] private auctions;

    /**
     * events
     */

    // for logging
    event NewAuction(uint256 auctionId);
    event NewBid(address by);

    // for subscription
    event AuctionEnds(bool success);
    event AuctionWasWon(address winner);

    /**
     * modifiers
     */

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

    modifier setAuctionState(uint256 auctionId) {
        if (block.timestamp < auctions[auctionId].info.userSet.biddingEndDate)
            auctions[auctionId].info.state = AuctionState.Active;
        else if (!minimumPriceRequirementMet(auctionId))
            auctions[auctionId].info.state = AuctionState.Failure;
        else if (
            block.timestamp <
            auctions[auctionId].info.userSet.confirmationEndDate
        ) auctions[auctionId].info.state = AuctionState.InConfirmation;
        else if (auctions[auctionId].info.state != AuctionState.Success)
            auctions[auctionId].info.state = AuctionState.Failure;
        else auctions[auctionId].info.state = AuctionState.Success;
        _;
    }

    // make sure auction is active or in confirmation
    modifier checkAuctionStateIs(uint256 auctionId, AuctionState state) {
        if (state != auctions[auctionId].info.state) {
            if (state == AuctionState.Active)
                revert("Bidding period has ended!");
            if (state == AuctionState.InConfirmation)
                revert("Not in confirmation period!");
        }
        _;
    }

    // make sure auction is not active
    modifier checkAuctionStateIsNot(uint256 auctionId, AuctionState state) {
        if (state == auctions[auctionId].info.state) {
            if (state == AuctionState.Active)
                revert("Auction is still active!");
        }
        _;
    }

    /**
     * private functions
     */

    function checkThatCommitmentIsPositive(
        string memory commitment
    ) internal pure returns (bool) {}

    function minimumPriceRequirementMet(
        uint256 auctionId
    ) internal pure returns (bool) {
        return true; // FIXME
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
            state: AuctionState.Active
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

    function getActiveAuctions()
        external
        view
        returns (PublicAuctionInfo[] memory)
    {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < auctions.length; i++) {
            if (auctions[i].info.state == AuctionState.Active) {
                activeCount++;
            }
        }

        PublicAuctionInfo[] memory activeAuctions = new PublicAuctionInfo[](
            activeCount
        );
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < auctions.length; i++) {
            if (auctions[i].info.state == AuctionState.Active) {
                activeAuctions[currentIndex] = auctions[i].info;
                currentIndex++;
            }
        }

        return activeAuctions;
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
        setAuctionState(auctionId)
        checkAuctionStateIs(auctionId, AuctionState.Active)
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

    function returnDeposit(
        uint256 auctionId
    )
        external
        validAuctionId(auctionId)
        existingBidder(auctionId)
        setAuctionState(auctionId)
        checkAuctionStateIsNot(auctionId, AuctionState.Active)
    {
        // no re-entrancy attacks!
        auctions[auctionId].bids[msg.sender] = 0;
        payable(msg.sender).transfer(
            auctions[auctionId].info.userSet.securityDeposit
        );
    }

    // TODO two-sign
    function transferWinningBidToOwner(
        uint256 auctionId
    )
        external
        validAuctionId(auctionId)
        onlySeller(auctionId)
        setAuctionState(auctionId)
        checkAuctionStateIs(auctionId, AuctionState.InConfirmation)
    {
        auctions[auctionId].info.state = AuctionState.Success;
        // FIXME: "unhash" the bid
        auctions[auctionId].highestBidder.transfer(
            auctions[auctionId].highestBid
        );
    }
}
