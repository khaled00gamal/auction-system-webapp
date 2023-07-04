# Description of An Auction's Lifecycle

## 1. Owner wants to create an auction

### They publish on the contract (value = security deposit):

#### Administrative (using auctionhelper.sh)

    - generated public.pem (the owner's public key for the auction)
    - generated params.dat (the encryption parameters)

#### Item

    - item name
    - item description
    - item picture

#### Transactional

    - minimum price
    - security deposit

#### Dates

    - bidding end date
    - revealing end date
    - sorting end date
    - verification end date

## [Bidding Phase]

## 2. Bidder wants to place a bid

### They publish on the contract (value = security deposit):

#### Bid Information (using auctionhelper.sh)

    - generated d.dat (commitment 1)
    - generated c.dat (commitment 2)

## [Reveal Phase]

## 3. Bidder wants to reveal bid

### They publish on the contract:

    - generated z.dat (reveal to commitment 1)

## [If Reveal Phase ends and a bidder didn't reveal, they are removed from the auction without refund.]

## [Sorting Phase]

## 4. Owner wants to sort bids

### They request from the contract:

    - all generated z.dat for the auction with bidder id

### Then, they sort them locally (using auctionhelper.sh).

### Then, they publish on the contract:

    - the winning y, with associated bidder id

## [If Sorting Phase ends and owner didn't sort, auction ends, bidders are refunded, but not owner]

## [Verification Phase]

## 5. Bidder wants to verify the sort

### They request from the contract:

    - the winning y

### Then, they check whether their y is bigger (using auctionhelper.sh)

### If it is, they object to the contract, publishing:

    - their y

### The contract verifies the objection, and if it is valid, a new winner is announced.

## What happens when the verification phase ends?

    * Auction fails if winning bid is less than the minimimum price.
    * Otherwise, auction succeeds.
