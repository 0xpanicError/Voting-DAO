# Voting Smart Contract Documentation

The `Voting` smart contract enables users to create proposals, vote on them, and end proposals. Each proposal has a description, a creator, a deadline, and counts for yay and nay votes.

# Run the Frontend
 The frontend is written in React. To run the frontend simply follow the steps below.

```bash
git clone https://www.github.com/0xpanicError/voting-DAO
```
```bash
cd votingDAO
cd site
```
```bash
yarn install && yarn start
```

## Structs

### Proposal

- `description` (string): A text description of the proposal.
- `isActive` (bool): Indicates if the proposal is currently active.
- `creator` (address): The address of the user who created the proposal.
- `deadline` (uint256): The timestamp when the proposal expires and voting ends.
- `yayCount` (uint256): The count of yay votes.
- `nayCount` (uint256): The count of nay votes.

# Functions

## createProposal

Creates a new proposal.

**Parameters:**

- `_des` (string): The description of the proposal.
- `_time` (uint256): The time period for the proposal in seconds.

**Returns:**

- (uint256): The ID of the created proposal.

## vote

Allows a user to vote on a proposal.

**Parameters:**

- `_id` (uint256): The ID of the proposal.
- `_vote` (bool): `true` for yay, `false` for nay.

## endProposal

Ends a proposal and returns the result.

**Parameters:**

- `_id` (uint256): The ID of the proposal.

**Returns:**

- (bool): `true` if yay votes are greater than nay votes, `false` otherwise.

## getProposalById

Retrieves a proposal by its ID.

**Parameters:**

- `_id` (uint256): The ID of the proposal.

**Returns:**

- (Proposal): The proposal with the given ID.

## getProposalCount

Returns the total number of proposals.

**Returns:**

- (uint256): The number of proposals.

## getDescription

Returns the description of a proposal.

**Parameters:**

- `_id` (uint256): The ID of the proposal.

**Returns:**

- (string): The description of the proposal.

## isActive

Checks if a proposal is active.

**Parameters:**

- `_id` (uint256): The ID of the proposal.

**Returns:**

- (bool): `true` if the proposal is active, `false` otherwise.

## getCreator

Returns the creator of a proposal.

**Parameters:**

- `_id` (uint256): The ID of the proposal.

**Returns:**

- (address): The address of the proposal creator.

## getDeadline

Returns the deadline of a proposal.

**Parameters:**

- `_id` (uint256): The ID of the proposal.

**Returns:**

- (uint256): The deadline timestamp of the proposal.

## getYayCount

Returns the number of yay votes for a proposal.

**Parameters:**

- `_id` (uint256): The ID of the proposal.

**Returns:**

- (uint256): The count of yay votes.

## getNayCount

Returns the number of nay votes for a proposal.

**Parameters:**

- `_id` (uint256): The ID of the proposal.

**Returns:**

- (uint256): The count of nay votes.
