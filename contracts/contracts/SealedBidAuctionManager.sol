// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// NOTE: all currency is wei

contract SealedBidAuctionManager {
    struct UserSetAuctionInfo {
        // administrative
        address payable owner;
        string params;
        string owner_pkey;
        // item
        string itemName;
        string itemDesc;
        string itemPicture;
        // transactional
        uint256 minimumPrice;
        uint256 securityDeposit;
        // dates
        uint256 biddingEndDate;
        uint256 revealingEndDate;
        uint256 sortingEndDate;
        uint256 verificationEndDate;
    }

    struct Bid {
        // to bid
        bytes32 c;
        bytes32 d;
        // to reveal
        string z;
    }

    struct AuctionWinner {
        string y;
        address bidder;
    }

    struct Auction {
        uint256 id;
        UserSetAuctionInfo info;
        mapping(address => Bid) bids;
        address[] bidders;
        AuctionState state;
        AuctionWinner winner;
    }

    enum AuctionState {
        BiddingPhase,
        RevealingPhase,
        SortingPhase,
        VerificationPhase,
        Success,
        Failure
    }

    Auction[] private auctions;

    // events for logging and subscription

    event NewAuction(uint256 auctionId);
    event NewBid(uint256 auctionId, address by);
    event NewReveal(uint256 auctionId, address by);
    event BidderRemoved(uint256, address who);
    event WinnerDecided(uint256 auctionId);
    event ObjectionSuccessful(uint256 auctionId, address by);
    event AuctionEnds(uint256 auctionId, bool success);

    // modifiers for modularity

    modifier SenderDidNotPlaceABid(uint256 auctionId) {
        if (auctions[auctionId].bids[msg.sender].c.length != 0)
            revert("Sender has already placed a bid!");
        _;
    }

    modifier SenderPlacedABid(uint256 auctionId) {
        if (auctions[auctionId].bids[msg.sender].c.length == 0)
            revert("Sender has not placed a bid!");
        _;
    }

    modifier SenderIsOwner(uint256 auctionId) {
        if (msg.sender != auctions[auctionId].info.owner)
            revert("Sender is not the owner!");
        _;
    }

    modifier SenderIsNotOwner(uint256 auctionId) {
        if (msg.sender != auctions[auctionId].info.owner)
            revert("Sender is the owner!");
        _;
    }

    modifier AuctionIDIsValid(uint256 auctionId) {
        if (auctionId >= auctions.length) revert("Auction ID is not valid!");
        _;
    }

    modifier CheckAuctionState(uint256 auctionId, AuctionState state) {
        // set it
        if (block.timestamp < auctions[auctionId].info.biddingEndDate)
            auctions[auctionId].state = AuctionState.BiddingPhase;
        else if (block.timestamp < auctions[auctionId].info.revealingEndDate)
            auctions[auctionId].state = AuctionState.RevealingPhase;
        else if (block.timestamp < auctions[auctionId].info.sortingEndDate)
            auctions[auctionId].state = AuctionState.SortingPhase;
        else if (block.timestamp < auctions[auctionId].info.verificationEndDate)
            auctions[auctionId].state = AuctionState.VerificationPhase;
        // else, state == AuctionState.Success || state == AuctionState.Failure

        // check it
        if (state != auctions[auctionId].state) {
            revert("Inappropriate operation!");
        }
        _;
    }

    modifier ValueEquals(uint v) {
        if (msg.value != v) revert("Sent value is not right!");
        _;
    }

    // private functions

    function _stringToBytes32(
        string memory source
    ) private pure returns (bytes32 result) {
        bytes memory b = bytes(source);
        if (b.length == 0) return 0;

        assembly {
            result := mload(add(source, 32))
        }
    }

    function _removeBidder(uint256 auctionId, uint index) internal {
        require(index < auctions[auctionId].bidders.length);

        auctions[auctionId].bidders[index] = auctions[auctionId].bidders[
            auctions[auctionId].bidders.length - 1
        ];
        auctions[auctionId].bidders.pop();
    }

    // external functions to be called at any time

    function getNumberOfRegisteredAuctions() external view returns (uint256) {
        return auctions.length;
    }

    function createAuction(
        UserSetAuctionInfo calldata info
    ) external payable ValueEquals(info.securityDeposit) returns (uint256) {
        // validation of auction parameters
        if (info.minimumPrice == 0)
            revert("Minimum price must be a positive number");

        if (
            info.securityDeposit > info.minimumPrice ||
            info.securityDeposit == 0
        )
            revert(
                "The relation (0 < Security Deposit < Minimum Price) is not satisfied."
            );

        if (
            !(info.verificationEndDate > info.sortingEndDate &&
                info.sortingEndDate > info.revealingEndDate &&
                info.revealingEndDate > info.biddingEndDate)
        ) revert("Dates are not in the right order.");

        // valid? add it
        Auction storage auction = auctions.push();

        auction.id = auctions.length;
        auction.info = info;
        auction.state = AuctionState.BiddingPhase;
        auction.winner = AuctionWinner({y: "", bidder: address(0)});

        emit NewAuction(auction.id);
        return auction.id;
    }

    function getAuctionsByState(
        AuctionState state
    ) external view returns (UserSetAuctionInfo[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < auctions.length; i++) {
            if (auctions[i].state == state) {
                count++;
            }
        }

        UserSetAuctionInfo[] memory data = new UserSetAuctionInfo[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < auctions.length; i++) {
            if (auctions[i].state == state) {
                data[j] = auctions[i].info;
                j++;
            }
        }

        return data;
    }

    function getAuctionInfo(
        uint256 auctionId
    )
        external
        view
        AuctionIDIsValid(auctionId)
        returns (UserSetAuctionInfo memory)
    {
        return auctions[auctionId].info;
    }

    // functions to be called throughout the auction process

    function placeBid(
        uint256 auctionId,
        string calldata c,
        string calldata d
    )
        external
        payable
        AuctionIDIsValid(auctionId)
        SenderIsNotOwner(auctionId)
        SenderDidNotPlaceABid(auctionId)
        CheckAuctionState(auctionId, AuctionState.BiddingPhase)
        ValueEquals(auctions[auctionId].info.securityDeposit)
    {
        auctions[auctionId].bids[msg.sender] = Bid({
            c: _stringToBytes32(c),
            d: _stringToBytes32(d),
            z: ""
        });
        auctions[auctionId].bidders[auctions[auctionId].bidders.length] = msg
            .sender;
        emit NewBid(auctionId, msg.sender);
    }

    function revealBid(
        uint256 auctionId,
        string calldata z
    )
        external
        AuctionIDIsValid(auctionId)
        SenderPlacedABid(auctionId)
        CheckAuctionState(auctionId, AuctionState.RevealingPhase)
    {
        // verify commitment
        if (sha256(bytes(z)) != auctions[auctionId].bids[msg.sender].d)
            revert("Hash is invalid!");

        auctions[auctionId].bids[msg.sender].z = z;
        emit NewReveal(auctionId, msg.sender);
    }

    function getReveals(
        uint256 auctionId
    )
        external
        AuctionIDIsValid(auctionId)
        SenderIsOwner(auctionId)
        CheckAuctionState(auctionId, AuctionState.SortingPhase)
        returns (string[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < auctions[auctionId].bidders.length; i++) {
            address bidder = auctions[auctionId].bidders[i];
            if (bytes(auctions[auctionId].bids[bidder].z).length == 0) {
                // remove them, no refunds
                _removeBidder(auctionId, i);
                emit BidderRemoved(auctionId, bidder);
            } else {
                count++;
            }
        }

        string[] memory zs = new string[](count);
        for (uint256 i = 0; i < auctions[auctionId].bidders.length; i++) {
            zs[i] = auctions[auctionId].bids[auctions[auctionId].bidders[i]].z;
        }

        return zs;
    }

    function declareWinner(
        uint256 auctionId,
        AuctionWinner calldata winner
    )
        external
        AuctionIDIsValid(auctionId)
        SenderIsOwner(auctionId)
        CheckAuctionState(auctionId, AuctionState.SortingPhase)
    {
        // verify commitment
        if (
            sha256(bytes(winner.y)) != auctions[auctionId].bids[winner.bidder].c
        ) revert("Hash is invalid!");

        auctions[auctionId].winner = winner;
        emit WinnerDecided(auctionId);
    }

    function getWinner(
        uint256 auctionId
    ) external view AuctionIDIsValid(auctionId) returns (AuctionWinner memory) {
        return auctions[auctionId].winner;
    }

    function objectToWinner(
        uint256 auctionId,
        string calldata y
    )
        external
        AuctionIDIsValid(auctionId)
        SenderPlacedABid(auctionId)
        CheckAuctionState(auctionId, AuctionState.VerificationPhase)
    {
        // verify commitment
        if (sha256(bytes(y)) != auctions[auctionId].bids[msg.sender].c)
            revert("Hash is invalid!");

        // verify that it is bigger
        // TODO have chainauction-helper emit a signed message saying that y > auctions[auctionId].winner.y
        revert("Not implemented");

        // auctions[auctionId].winner = winner;
        // emit WinnerDecided(auctionId, winner.bidder);
    }
}
