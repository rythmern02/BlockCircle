// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Lottery Contract to handle the random lottery selection using VRF
contract ChainPotLottery is Ownable(msg.sender){
    using SafeMath for uint256;

    // Chainlink VRF Coordinator and LinkToken interfaces
    VRFCoordinatorV2Interface private vrfCoordinator;
    LinkTokenInterface private linkToken;

    // Lottery parameters
    uint64 private s_subscriptionId;
    bytes32 private keyHash;
    uint256 private requestId;
    uint256 public randomResult;

    // Mapping to track eligible members for the lottery
    address[] public eligibleMembers;
    
    // Total funds available for the lottery
    uint256 public totalFunds;

    // Event to log lottery results
    event LotteryWinner(address indexed winner, uint256 amount);

    // Constructor to initialize Chainlink VRF interfaces and key hashes
    constructor(address _vrfCoordinator, address _linkToken, uint64 _subscriptionId, bytes32 _keyHash) {
        vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
        linkToken = LinkTokenInterface(_linkToken);
        s_subscriptionId = _subscriptionId;
        keyHash = _keyHash;
    }

    // Function to start a lottery if no bids are placed
    function startLottery(uint256 _totalFunds) external onlyOwner {
        require(_totalFunds > 0, "Total funds must be greater than zero.");

        totalFunds = _totalFunds;

        // Check if there are any bids placed; if not, start the lottery
        require(eligibleMembers.length > 0, "No members to participate in the lottery.");
        
        // Request randomness from Chainlink VRF
        requestRandomness();
    }

    // Function to request randomness from Chainlink VRF
    function requestRandomness() internal {
        // Request a random number from Chainlink VRF
        requestId = vrfCoordinator.requestRandomWords(
            keyHash,
            s_subscriptionId,
            3,  // Minimum number of confirmations
            200000,  // Gas limit for the request
            1 // Number of random words
        );
    }

    // Callback function from Chainlink VRF
    function fulfillRandomWords(uint256 _requestId, uint256[] memory randomWords) internal {
        require(_requestId == requestId, "Request ID mismatch");
        randomResult = randomWords[0];

        // Select the winner based on the random result
        address winner = eligibleMembers[randomResult % eligibleMembers.length];

        // Transfer the pooled funds to the winner
        payable(winner).transfer(totalFunds);

        // Emit the event with the lottery result
        emit LotteryWinner(winner, totalFunds);

        // Reset the lottery
        totalFunds = 0;
    }

    // Function to add eligible members for the lottery
    function addEligibleMember(address member) external onlyOwner {
        eligibleMembers.push(member);
    }

    // Function to remove an eligible member
    function removeEligibleMember(address member) external onlyOwner {
        for (uint256 i = 0; i < eligibleMembers.length; i++) {
            if (eligibleMembers[i] == member) {
                eligibleMembers[i] = eligibleMembers[eligibleMembers.length - 1];
                eligibleMembers.pop();
                break;
            }
        }
    }

    // Fallback function to accept Ether contributions
    receive() external payable {
        // Funds can be added to the lottery pool
    }
}
