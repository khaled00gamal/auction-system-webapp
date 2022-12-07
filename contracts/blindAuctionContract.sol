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

    function bid(bytes32 _blindedBid) public payable onlyBefore(biddingEnd) {
        bids[msg.sender].push(
            Bid({blindedBid: _blindedBid, deposit: msg.value})
        );
    }

    //input value : bid must be at least the value
    //input fake : to be valid fake must not be true
    function reveal(
        uint256[] memory _values,
        bool[] memory _fake,
        bytes32[] memory _secret
    ) public onlyAfter(biddingEnd) onlyBefore(revealEnd) {
        uint256 length = bids[msg.sender].length;

        require(_values.length == length);
        require(_fake.length == length);
        require(_secret.length == length);

        uint256 refund;
        //need to check all the stored bids of the msg sender
        for (uint256 i = 0; i < length; i++) {
            Bid storage bidToCheck = bids[msg.sender][i];
            (uint256 value, bool fake, bytes32 secret) = (
                _values[i],
                _fake[i],
                _secret[i]
            );

            if (
                bidToCheck.blindedBid !=
                keccak256(abi.encodePacked(value, fake, secret))
            ) {
                //bid wasnt revealed, dont refund
                continue;
            }
            refund += bidToCheck.deposit;

            if (!fake && bidToCheck.deposit >= value) {
                if (placeBid(msg.sender, value)) {
                    refund -= value;
                }
            }

            //stop sender from reclaiminjg the same deposit
            bidToCheck.blindedBid = bytes32(0);
        }
        //transfer refend to msg sender
        payable(msg.sender).transfer(refund);
    }
}
