// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Voting.sol";

contract VotingTest is Test {
    Voting public voting;

    function setUp() public {
        voting = new Voting();
    }

    function testCreateProposal() public {
        uint lenPrev = voting.getProposalCount();
        voting.createProposal("test", 100);
        uint lenAfter = voting.getProposalCount();
        assertEq(lenPrev + 1, lenAfter);
        string memory des = voting.getDescription(lenPrev);
        assertEq(des, "test");
        bool isActive = voting.isActive(lenPrev);
        assertEq(isActive, true);
        address creator = voting.getCreator(lenPrev);
        assertEq(creator, address(this));
        uint deadline = voting.getDeadline(lenPrev);
        assertEq(deadline, 100 + block.timestamp);
        uint yayCount = voting.getYayCount(lenPrev);
        assertEq(yayCount, 0);
        uint nayCount = voting.getNayCount(lenPrev);
        assertEq(nayCount, 0);
    }

    function testVoteTrue() public {
        voting.createProposal("test", 100);
        uint yayBefore = voting.getYayCount(0);
        uint nayBefore = voting.getNayCount(0);
        voting.vote(0, true);
        uint yayAfter = voting.getYayCount(0);
        uint nayAfter = voting.getNayCount(0);
        assertEq(yayBefore + 1, yayAfter);
        assertEq(nayBefore, nayAfter);
    }

    function testVoteFlase() public {
        voting.createProposal("test", 100);
        uint yayBefore = voting.getYayCount(0);
        uint nayBefore = voting.getNayCount(0);
        voting.vote(0, false);
        uint yayAfter = voting.getYayCount(0);
        uint nayAfter = voting.getNayCount(0);
        assertEq(yayBefore, yayAfter);
        assertEq(nayBefore + 1, nayAfter);
    }

    function testFailEndProposal() public {
        voting.createProposal("test", 100);
        voting.endProposal(0);
    }

    function testEndProposalTrue() public {
        uint time = block.timestamp;
        voting.createProposal("test", 100);
        voting.vote(0, true);
        vm.warp(time + 101);
        bool result = voting.endProposal(0);
        assertEq(result, true);
    }

    function testEndProposalFalse() public {
        uint time = block.timestamp;
        voting.createProposal("test", 100);
        voting.vote(0, false);
        vm.warp(time + 101);
        bool result = voting.endProposal(0);
        assertEq(result, false);
    }
}
