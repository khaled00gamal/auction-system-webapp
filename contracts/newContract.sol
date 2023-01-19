// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract blindAuction {
    
    /**
     * types
     */

    struct bid {
        bytes32 bidHash; // bid hashed using public key
        uint256 deposit; // security deposit
        bool revealed;
    }

    struct auction {
        uint256 auctionId;

        // dates
        uint256 auctionStart; // or biddingStart
        uint256 biddingEnd; // or revealStart
        uint256 revealEnd;
        bool ended;
        bool sold;

        // item
        string itemName;
        string itemDesc;

        // protocol
        uint256 highestBid;
        address payable seller;
        address payable highestBidder;

        // participants
        mapping(address => bid) bids;
        mapping(address => string) pubkey;
    }

    struct publicAuctionInfo {
        string itemName;
        string itemDesc;
        uint256 auctionStart;
        uint256 biddingEnd;
        uint256 revealEnd;
    }

    /**
     * events
     */

    event AuctionStarted(
        uint256 auctionId,
        string itemName,
        string itemDesc
    );

    event AuctionEnded(
        uint256 auctionId,
        uint256 highestBid,
        address highestBidder
    );

    event BiddingEnded(
        uint256 auctionId
    );

    event BidMade(
        address bidder
    );

    event RevealEnded(
        uint256 auctionId
    );

    event WinnerSelected(
        uint256 auctionId,
        address winner
    );

    /**
     * state variables
     */

    uint256[] registeredAuctions;

    mapping(uint256 => auction) private auctions;


    /**
     * time-aware modifiers
     */

    modifier onlyBefore(string calldata whatisit, uint256 _time) {
        require(block.timestamp < _time, string.concat(whatisit, " too late!"));
        _;
    }

    modifier onlyAfter(string calldata whatisit, uint256 _time) {
        require(block.timestamp > _time, string.concat(whatisit, " too early!"));
        _;
    }

    /**
     * auction-aware modifiers
     */

    modifier newBidder(uint256 auction_id) {
        require(auctions[auction_id].bids[msg.sender].bidHash != 0, "bid already placed!");
        _;
    }

    modifier validBidder(uint256 auction_id) {
        require(msg.sender != auctions[auction_id].seller, "seller cannot bid!");
        _;
    }

    modifier onlyOwner(uint256 auctionId) {
        require(msg.sender == auctions[auctionId].seller, "you must be the seller to do this!");
        _;
    }

    modifier auctionActive(uint256 auction_id) {
        require(auctions[auction_id].ended == false, "auction already ended!");
        _;
    }

    modifier onlyWinner(uint256 auction_id) {
        require(msg.sender == auctions[auction_id].highestBidder, "you must be the auction winner to do this!");
        _;
    }

    modifier validAuctionId(uint256 auction_id) {
        require(auctions[auction_id].auctionId != 0, "auction not found!");
        _;
    }

    /**
     * functions
     * TODO: those are only drafts
     */

    function getActiveAuctions() external view
        returns (publicAuctionInfo[] memory) {}

    function placeBid(uint256 auctionId, address bidder) external payable
        validAuctionId(auctionId)
        onlyBefore("place bid", auctions[auctionId].biddingEnd)
        validBidder(auctionId)
        newBidder(auctionId)
        returns (bool success)
    {
        emit BidMade(msg.sender);
        return false;
    }


    function reveal() internal {}
    function endAuction(uint256 auctionId) external
        validAuctionId(auctionId)
        onlyAfter("auction end", auctions[auctionId].revealEnd)
        onlyOwner(auctionId)
        auctionActive(auctionId)
    {
        emit AuctionEnded();
    }     
}
