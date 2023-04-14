// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Voting {
    struct Proposal {
        string description;
        bool isActive;
        address creator;
        uint256 deadline;
        uint256 yayCount;
        uint256 nayCount;
    }

    Proposal[] proposals;

    /***
     * @notice : create a proposal
     * @param _des : description of the proposal
     * @param _time : time period for the proposal in seconds
     */
    function createProposal(
        string calldata _des,
        uint256 _time
    ) public returns (uint256) {
        require(_time > 0, "Time period must be greater than 0");
        Proposal memory _proposal = Proposal({
            description: _des,
            isActive: true,
            creator: msg.sender,
            deadline: _time + block.timestamp,
            yayCount: 0,
            nayCount: 0
        });
        proposals.push(_proposal);
        return proposals.length - 1;
    }

    /***
     * @notice: vote on a proposal
     * @param _id: id of the proposal
     * @param _vote: true for yay, false for nay
     */
    function vote(uint256 _id, bool _vote) public {
        Proposal storage _proposal = proposals[_id];
        require(isActive(_id), "Proposal is not active");
        require(_proposal.deadline > block.timestamp, "Proposal has expired");
        if (_vote) {
            _proposal.yayCount++;
        } else {
            _proposal.nayCount++;
        }
    }

    /***
     * @notice: end a proposal
     * @param _id : id of the proposal
     */
    function endProposal(uint256 _id) public returns (bool) {
        Proposal storage _proposal = proposals[_id];
        require(isActive(_id), "Proposal is not active");
        require(
            _proposal.deadline < block.timestamp,
            "Proposal has not expired"
        );
        _proposal.isActive = false;
        return (_proposal.yayCount > _proposal.nayCount);
    }

    function getProposalById(
        uint256 _id
    ) public view returns (Proposal memory) {
        return proposals[_id];
    }

    function getProposalCount() public view returns (uint256) {
        return proposals.length;
    }

    function getDescription(uint256 _id) public view returns (string memory) {
        return proposals[_id].description;
    }

    function isActive(uint256 _id) public view returns (bool) {
        return proposals[_id].isActive;
    }

    function getCreator(uint256 _id) public view returns (address) {
        return proposals[_id].creator;
    }

    function getDeadline(uint256 _id) public view returns (uint256) {
        return proposals[_id].deadline;
    }

    function getYayCount(uint256 _id) public view returns (uint256) {
        return proposals[_id].yayCount;
    }

    function getNayCount(uint256 _id) public view returns (uint256) {
        return proposals[_id].nayCount;
    }
}
