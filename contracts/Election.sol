pragma solidity ^0.5.0;

contract Election {

	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}
	uint public candidatesCount = 0;
	mapping(uint => Candidate) public candidates;

	mapping(address => bool) public voters;

	function addCandidate(string memory _name) private {
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
	}
	constructor() public {
		addCandidate("Candidate 1");
		addCandidate("Candidate 2");
	}

	event votedEvent(uint _id);

	function vote(uint _id) public {
		require(!voters[msg.sender]);
		require(_id>0 && _id<= candidatesCount);
		voters[msg.sender] = true;
		candidates[_id].voteCount++;
		emit votedEvent(_id);
	}
}