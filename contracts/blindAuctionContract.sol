// SPDX-License-Identifier: MIT
pragma solidity ^0.9.0;

contract BlindAuction {
    //a bid consists of a safety deposity and a blindBid value
    struct Bid {
        bytes32 blindedBid;
        uint256 deposit;
    }

    address payable public beneficiary;
    uint256 public biddingEnd;
    uint256 public revealEnd;
    uint256 public highestBid;
    address public highestBidder;
    bool public ended;

    //map of each address to an array of its bids
    mapping(address => Bid[]) public bids;

    //map of each address and their allowed returns
    mapping(address => uint256) pendingReturns;

    constructor(
        uint256 _biddingTime,
        uint256 _revealTime,
        address payable _beneficiary
    ) {
        //block.timestamp returns the exact time the block was generated
        biddingEnd = block.timestamp + _biddingTime;
        revealEnd = biddingEnd + _revealTime;
        beneficiary = _beneficiary;
    }

    //events are used to store arguments in the transaction logs
    //to use them later in the calling application
    event AuctionEnd(address winner, uint256 highestBid);

    //to ensure bids are only before the bidding end time
    modifier onlyBefore(uint256 _time) {
        require(block.timestamp < _time);
        _;
    }

    modifier onlyAfter(uint256 _time) {
        require(block.timestamp > _time);
        _;
    }
}
