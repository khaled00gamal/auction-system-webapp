// SPDX-License-Identifier: MIT
pragma solidity ^0.9.0;

contract blindAuction {
    struct bid {
        bytes32 bidHash; //bid hashed using public key
        uint256 deposit; //security deposit
    }

    struct auction {
        string itemName;
        string itemDesc;
        string H; //secret string to sell item encrypted with buyer's public key
        uint256 auctionId;
        uint256 biddingEnd;
        uint256 revealEnd;
        uint256 highestBid;
        uint256 winningBid;
        address payable seller;
        address payable highestBidder;
        address payable winner;
        address payable[] revealedBidders; //revealed bidders after auction end
        bool ended;
        bool sold;
        mapping(address => bid) bids;
        mapping(address => bool) revealed;
        mapping(address => bool) placedBid; //map of addresses that placed a bid
        mapping(address => uint256) pendingReturns; // Allowed withdrawals of previous bids
        mapping(address => string) pubkey;
    }

    mapping(uint256 => auction) private Auctions; //list of all auctions

    //variables to track the running auction
    uint256 currentAuctionId = 0;
    uint256 activeAuctions = 0;

    //to display all auction listings
    struct allListings {
        uint256 auction_id;
        address payable seller;
        address payable winner;
        uint256 biddingEnd;
        uint256 revealEnd;
        bool ended;
        bool sold;
        string itemName;
        string itemDesc;
        bool bidplaced;
        bool revealed;
        uint256 finalBid;
        string pubkey;
        string H;
    }
    //to display each active listing in the auction
    struct activeListing {
        string itemName;
        string itemDesc;
        uint256 auctionId;
        address payable seller;
        uint256 biddingEnd;
        uint256 revealEnd;
        bool ended;
        bool revealed;
        bool bidPlaced;
    }
    event AuctionStarted(uint256 auctionId, string itemName, string itemDesc);
    event AuctionEnded(
        uint256 auctionId,
        uint256 highestBid,
        address highestBidder
    );
    event ItemUnsold(uint256 auctionId);
    event BiddingStarted(uint256 auctionId, uint256 biddingEnd);
    event BiddingEnded(uint256 auctionId);
    event BidIsMade(address bidder);
    event RevealStarted(uint256 auctionId, uint256 revealEnd);
    event RevealEnded(uint256 auctionId);
    event WinnerSelected(
        uint256 auctionId,
        address winner,
        uint256 winningBid,
        string pubKey
    );
    event BidRevealed(uint256 auctionId, address bidder);
    event BidRevealFail(uint256 auctionId, address bidder);
    event BidderRefunded(uint256 auctionId, address bidder, uint256 bidValue);
    event BalanceRefunded(uint256 auctionId, address bidder, uint256 balance);
    event DepositLow(uint256 auctionId, address bidder);
    event NewHighestBid(uint256 auctionId, address bidder, uint256 bidValue);
    event encryptedKey(uint256 auction_id, string H); //event to send the hashed item
    event itemSent(uint256 auctionId);

    //modifiers
    //_; will be replaced with the function body of the function that calls the modifier
    modifier onlyBefore(uint256 _time) {
        require(block.timestamp < _time, "must be after time");
        _;
    }

    modifier onlyAfter(uint256 _time) {
        require(block.timestamp > _time, "must be before time");
        _;
    }

    //ensure bidder cant re-Bid
    modifier newBidder(uint256 auction_id) {
        require(
            !Auctions[auction_id].bidded[msg.sender],
            "Bidder Already placed their bid"
        );
        _;
    }

    //ensure seller doesnt bid
    modifier validBidder(uint256 auction_id) {
        require(msg.sender != Auctions[auction_id].seller, "seller cannot bid");
        _;
    }

    modifier onlyOwner(uint256 auctionId) {
        require(
            msg.sender == Auctions[auctionId].seller,
            "only seller can call this function"
        );
        _;
    }

    modifier auctionActive(uint256 auction_id) {
        require(Auctions[auctionId].ended == false, "Auction already ended");
        _;
    }

    modifier auctionEnded(uint256 auction_id) {
        require(
            Auctions[auctionId].ended == true,
            "Cant Ask refund,auction not ended"
        );
        _;
    }

    modifier onlyWinner(uint256 auction_id) {
        require(
            msg.sender == Auctions[auction_id].winner,
            "Only Winner can confirm purchase"
        );
        _;
    }

    modifier validAuctionId(uint256 auction_id) {
        require(
            auction_id < current_auction_id,
            "Auction Id provided doesn't exist"
        );
        _;
    }

    //functions
    //function to list auction of a new item
    function listAuctionItem(
        string calldata itemName,
        string calldata itemDesc,
        uint256 biddingTime,
        uint256 revealTime
    ) external payable {
        uint256 auctionId = currentAuctionId;
        currentAuctionId += 1;
        activeAuctions += 1;
        uint256 biddingEnd = block.timestamp + biddingTime;
        uint256 revealEnd = biddingEnd + revealTime;

        //construct the auction
        Auctions[auctionId] = auction(
            itemName, //itemName
            itemDesc, //itemDesc
            0, //H
            auctionId, //auctionId
            biddingEnd, // biddingEnd
            revealEnd, //revealEnd
            0, //highestBid
            address(0), //winningBid
            msg.sender, //seller
            address(0), //highestBidder
            new address payable[](0), //winner
            ""
        );
        emit AuctionStarted(auctionId, itemName, itemDesc);
        emit BiddingStarted(auctionId, biddingEnd);
    }
}
