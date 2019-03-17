var election = artifacts.require("./Election.sol");

contract("election", function(accounts) {

	var electionInstance;

	it("initializes with two candidates" , function(){
		return election.deployed().then(function(instance){
			return instance.candidatesCount();
		}).then(function(count){
			assert.equal(count,2)
		});
	});

	it("initializes two candidates with correct details" , function(){
		return election.deployed().then(function(instance){
			electionInstance = instance;
			return electionInstance.candidates(1);
		}).then(function(candidate){
			assert.equal(candidate[0],1, "Contains the correct id");
			assert.equal(candidate[1],"Candidate 1", "contains the correct Candidate name");
			assert.equal(candidate[2],0, "Initianlized to 0 vote");

			return electionInstance.candidates(2);
		}).then(function(candidate){
			assert.equal(candidate[0],2, "Contains the correct id");
			assert.equal(candidate[1],"Candidate 2", "contains the correct Candidate name");
			assert.equal(candidate[2],0, "Initianlized to 0 vote");

		});
	});

	it("allows a voter to vote" , function(){
		return election.deployed().then(function(instance){
			electionInstance = instance;
			candidateId = 1;
			return electionInstance.vote(candidateId, { from : accounts[0] });
		}).then(function(receipt){
			return electionInstance.voters[accounts[0]];
		}).then(function(voted){
			//assert(voted, "the voter was marked as voted");
			return electionInstance.candidates(candidateId);
		}).then(function(candidate){
			var voteCount = candidate[2];
			assert.equal(1, voteCount, "increments the candidate's vote by 1");
		});
	});
});