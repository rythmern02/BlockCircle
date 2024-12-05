// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title Community Auction Contract
/// @notice Decentralized auction system with comprehensive pool management
contract CommunityAuction is Ownable(msg.sender), ReentrancyGuard {
    // Stablecoin interface
    IERC20 public immutable stablecoin;

    // Structs
    struct Member {
        uint256 totalContributions;    // Total stablecoin contributed
        uint256 reputationPoints;      // Reputation earned
        uint256 poolsParticipated;     // Pools joined
        uint256 cyclesContributed;     // Total contribution cycles
        uint256 activeCollateral;      // Current locked collateral
        bool isRegistered;             // Registration status
    }

    struct Pool {
        uint256 poolId;                // Unique identifier
        uint256 cycleDuration;         // Duration in months
        uint256 totalPoolAmount;       // Total funds target for the pool
        uint256 currentPoolAmount;     // Current amount collected
        uint256 auctionDeadline;       // Auction end timestamp
        uint256 winningBid;            // Lowest successful bid
        address winner;                // Auction winner
        bool isClosed;                 // Pool closure status
        uint256 requiredContribution;  // Minimum contribution per participant
    }

    struct BidInfo {
        address bidder;                // Address of the bidder
        uint256 bidAmount;             // Bid amount
    }

    // Constants
    uint256 public constant MIN_CONTRIBUTION = 100 * 1e18;      // Minimum 100 stablecoins
    uint256 public constant MAX_PARTICIPANTS = 12;              // Max pool participants
    uint256 public constant BASE_REPUTATION_POINTS = 10;        // Initial reputation points
    uint256 public constant CYCLE_DURATION = 30 days;           // Standard cycle duration
    uint256 public constant WINNER_REPUTATION_BONUS = 5;        // Reputation bonus for winner

    // Mappings
    mapping(address => Member) public members;
    mapping(uint256 => Pool) public pools;
    mapping(uint256 => mapping(address => uint256)) public memberBids;
    mapping(uint256 => address[]) public poolParticipants;

    // State Variables
    uint256 public poolCounter;

    // Events
    event MemberRegistered(address indexed member, uint256 initialReputationPoints);
    event ContributionReceived(address indexed member, uint256 amount);
    event PoolCreated(
        uint256 indexed poolId, 
        uint256 cycleDuration, 
        uint256 requiredContribution, 
        uint256 participantCount
    );
    event BidPlaced(
        address indexed member, 
        uint256 indexed poolId, 
        uint256 bidAmount
    );
    event AuctionClosed(
        uint256 indexed poolId, 
        address indexed winner, 
        uint256 winningBid
    );
    event WinnerPaymentProcessed(
        address indexed winner, 
        uint256 indexed poolId, 
        uint256 amount
    );
    event CollateralReleased(
        address indexed member, 
        uint256 indexed poolId, 
        uint256 amount
    );

    // Modifiers
    modifier onlyRegistered() {
        _requireRegistration(msg.sender);
        _;
    }

    modifier poolActive(uint256 poolId) {
        _validatePoolActive(poolId);
        _;
    }

    /// @notice Constructor initializes the contract with stablecoin
    /// @param _stablecoinAddress Address of the stablecoin token
    constructor(address _stablecoinAddress) {
        require(_stablecoinAddress != address(0), "Invalid stablecoin address");
        stablecoin = IERC20(_stablecoinAddress);
        poolCounter = 1;
    }

    /// @notice Register a new member in the system
    function register() external {
        require(!members[msg.sender].isRegistered, "Member already registered");
        
        members[msg.sender] = Member({
            totalContributions: 0,
            reputationPoints: BASE_REPUTATION_POINTS,
            poolsParticipated: 0,
            cyclesContributed: 0,
            activeCollateral: 0,
            isRegistered: true
        });

        emit MemberRegistered(msg.sender, BASE_REPUTATION_POINTS);
    }

    /// @notice Contribute stablecoins to increase total contributions
    /// @param amount Contribution amount
    function contribute(uint256 amount) external onlyRegistered nonReentrant {
        require(amount >= MIN_CONTRIBUTION, "Contribution below minimum");
        
        require(
            stablecoin.transferFrom(msg.sender, address(this), amount), 
            "Contribution transfer failed"
        );

        Member storage member = members[msg.sender];
        member.totalContributions += amount;
        member.cyclesContributed++;

        emit ContributionReceived(msg.sender, amount);
    }
 /// @notice Create a new auction pool
    /// @param numParticipants Number of participants for the pool
    /// @param totalPoolAmount Total target amount for the pool
    function createPool(
        uint256 numParticipants, 
        uint256 totalPoolAmount
    ) external onlyOwner {
        // Validate participant count and pool amount
        require(
            numParticipants > 1 && numParticipants <= MAX_PARTICIPANTS, 
            "Invalid participant count"
        );
        require(totalPoolAmount > 0, "Total pool amount must be positive");

        // Calculate required contribution per participant
        uint256 requiredContribution = totalPoolAmount / numParticipants;
        uint256 cycleEndTime = block.timestamp + (numParticipants * CYCLE_DURATION);

        // Create new pool
        pools[poolCounter] = Pool({
            poolId: poolCounter,
            cycleDuration: numParticipants,
            totalPoolAmount: totalPoolAmount,
            currentPoolAmount: 0,
            auctionDeadline: cycleEndTime,
            winningBid: type(uint256).max,
            winner: address(0),
            isClosed: false,
            requiredContribution: requiredContribution
        });

        emit PoolCreated(
            poolCounter, 
            numParticipants, 
            requiredContribution, 
            totalPoolAmount
        );

        poolCounter++;
    }

    /// @notice Place a bid in an active auction pool
    /// @param poolId Pool to bid in
    /// @param bidAmount Bid amount
    function placeBid(
        uint256 poolId, 
        uint256 bidAmount
    ) external onlyRegistered poolActive(poolId) {
        Pool storage pool = pools[poolId];
        Member storage member = members[msg.sender];

        // Bid validation
        require(bidAmount >= pool.requiredContribution, "Bid below required amount");
        require(memberBids[poolId][msg.sender] == 0, "Already bid in this pool");

        // Record bid
        memberBids[poolId][msg.sender] = bidAmount;
        poolParticipants[poolId].push(msg.sender);
        pool.totalPoolAmount += bidAmount;

        emit BidPlaced(msg.sender, poolId, bidAmount);
    }

    /// @notice Close the auction and select the winner
    /// @param poolId Pool to close
    function closeAuction(uint256 poolId) external {
        Pool storage pool = pools[poolId];
        
        // Auction closure validation
        require(!pool.isClosed, "Pool already closed");
        require(block.timestamp >= pool.auctionDeadline, "Auction not yet ended");

        // Find and set the winner
        address lowestBidder = _findLowestBidder(poolId);
        
        pool.winner = lowestBidder;
        pool.winningBid = memberBids[poolId][lowestBidder];
        pool.isClosed = true;

        // Update winner's reputation
        Member storage winner = members[lowestBidder];
        winner.reputationPoints += WINNER_REPUTATION_BONUS ;
        winner.poolsParticipated++;

        emit AuctionClosed(poolId, lowestBidder, pool.winningBid);
    }

    /// @notice Process payment for the winning bid
    /// @param poolId Pool to process payment for
    function processWinnerPayment(uint256 poolId) external nonReentrant {
        Pool storage pool = pools[poolId];
        
        // Payment processing validation
        require(pool.isClosed, "Pool not closed");
        require(msg.sender == pool.winner, "Only winner can process payment");

        uint256 winningBidAmount = pool.winningBid;
        require(winningBidAmount > 0, "No bid to process");

        // Transfer the winning bid amount
        require(
            stablecoin.transferFrom(msg.sender, address(this), winningBidAmount), 
            "Payment transfer failed"
        );

        // Update winner's active collateral
        Member storage winner = members[msg.sender];
        winner.activeCollateral += winningBidAmount;

        emit WinnerPaymentProcessed(msg.sender, poolId, winningBidAmount);
    }

    /// @notice Release collateral for the winner
    /// @param poolId Pool to release collateral from
    function releaseCollateral(uint256 poolId) external nonReentrant {
        Pool storage pool = pools[poolId];
        
        // Collateral release validation
        require(pool.isClosed, "Pool not closed");
        require(msg.sender == pool.winner, "Only winner can release");

        uint256 collateralAmount = pool.winningBid;
        require(collateralAmount > 0, "No collateral to release");

        // Reset and transfer collateral
        Member storage winner = members[msg.sender];
        winner.activeCollateral -= collateralAmount;

        require(
            stablecoin.transfer(msg.sender, collateralAmount), 
            "Collateral transfer failed"
        );

        emit CollateralReleased(msg.sender, poolId, collateralAmount);
    }

    // Internal Utility Functions

    /// @notice Calculate required contribution based on participants
    /// @param numParticipants Number of pool participants
    /// @return Required contribution per participant
    function _calculateRequiredContribution(
        uint256 numParticipants
    ) internal pure returns (uint256) {
        return (numParticipants * 1000 * 1e18) / numParticipants;
    }

    /// @notice Find the lowest bidder in a pool
    /// @param poolId Pool to search
    /// @return Address of the lowest bidder
    function _findLowestBidder(uint256 poolId) internal view returns (address) {
        address[] memory participants = poolParticipants[poolId];
        require(participants.length > 0, "No participants in pool");

        address lowestBidder;
        uint256 lowestBid = type(uint256).max;

        for (uint256 i = 0; i < participants.length; i++) {
            address potentialBidder = participants[i];
            uint256 bidAmount = memberBids[poolId][potentialBidder];

            if (bidAmount > 0 && bidAmount < lowestBid) {
                lowestBid = bidAmount;
                lowestBidder = potentialBidder;
            }
        }

        require(lowestBidder != address(0), "No valid bidder found");
        return lowestBidder;
    }

    /// @notice Internal registration check
    /// @param account Address to check
    function _requireRegistration(address account) internal view {
        require(members[account].isRegistered, "Not registered");
    }

    /// @notice Internal pool activity validation
    /// @param poolId Pool to validate
    function _validatePoolActive(uint256 poolId) internal view {
        Pool storage pool = pools[poolId];
        require(!pool.isClosed, "Pool is closed");
        require(block.timestamp <= pool.auctionDeadline, "Auction ended");
    }

    // View Functions

    function getMemberInfo(
        address member
    ) external view returns (
        uint256 totalContributions,
        uint256 reputation,
        uint256 poolsParticipated,
        uint256 cyclesContributed,
        uint256 activeCollateral
    ) {
        Member storage m = members[member];
        return (
            m.totalContributions,
            m.reputationPoints,
            m.poolsParticipated,
            m.cyclesContributed,
            m.activeCollateral
        );
    }

    /// @notice Get pool participants
    /// @param poolId Pool to query
    /// @return Array of participant addresses
    function getPoolParticipants(uint256 poolId) external view returns (address[] memory) {
        return poolParticipants[poolId];
    }

     /// @notice Get comprehensive pool information
    /// @param poolId Pool to query
    function getPoolInfo(uint256 poolId) external view returns (
        uint256 id,
        uint256 cycleDuration,
        uint256 totalPoolAmount,
        uint256 currentPoolAmount,
        uint256 auctionDeadline,
        uint256 winningBid,
        address winner,
        bool isClosed,
        uint256 requiredContribution
    ) {
        Pool storage pool = pools[poolId];
        return (
            pool.poolId,
            pool.cycleDuration,
            pool.totalPoolAmount,
            pool.currentPoolAmount,
            pool.auctionDeadline,
            pool.winningBid,
            pool.winner,
            pool.isClosed,
            pool.requiredContribution
        );
    }

    /// @notice Get all bids for a specific pool
    /// @param poolId Pool to query
    /// @return Array of bid information
    function getPoolBids(uint256 poolId) external view returns (BidInfo[] memory) {
        address[] memory participants = poolParticipants[poolId];
        BidInfo[] memory bids = new BidInfo[](participants.length);

        for (uint256 i = 0; i < participants.length; i++) {
            address bidder = participants[i];
            uint256 bidAmount = memberBids[poolId][bidder];
            
            bids[i] = BidInfo({
                bidder: bidder,
                bidAmount: bidAmount
            });
        }

        return bids;
    }

    /// @notice Get all active pools
    /// @return Array of active pool IDs
    function getActivePools() external view returns (uint256[] memory) {
        uint256[] memory activePools = new uint256[](poolCounter - 1);
        uint256 activePoolCount = 0;

        for (uint256 i = 1; i < poolCounter; i++) {
            Pool storage pool = pools[i];
            if (!pool.isClosed && block.timestamp <= pool.auctionDeadline) {
                activePools[activePoolCount] = i;
                activePoolCount++;
            }
        }

        // Resize the array to the actual number of active pools
        assembly {
            mstore(activePools, activePoolCount)
        }

        return activePools;
    }

    /// @notice Get all closed pools
    /// @return Array of closed pool IDs
    function getClosedPools() external view returns (uint256[] memory) {
        uint256[] memory closedPools = new uint256[](poolCounter - 1);
        uint256 closedPoolCount = 0;

        for (uint256 i = 1; i < poolCounter; i++) {
            Pool storage pool = pools[i];
            if (pool.isClosed) {
                closedPools[closedPoolCount] = i;
                closedPoolCount++;
            }
        }

        // Resize the array to the actual number of closed pools
        assembly {
            mstore(closedPools, closedPoolCount)
        }

        return closedPools;
    }

    /// @notice Get member's participated pools
    /// @param member Address to query
    /// @return Array of pool IDs the member has participated in
    function getMemberPools(address member) external view returns (uint256[] memory) {
        uint256[] memory memberPools = new uint256[](poolCounter - 1);
        uint256 memberPoolCount = 0;

        for (uint256 i = 1; i < poolCounter; i++) {
            if (memberBids[i][member] > 0) {
                memberPools[memberPoolCount] = i;
                memberPoolCount++;
            }
        }

        // Resize the array to the actual number of member's pools
        assembly {
            mstore(memberPools, memberPoolCount)
        }

        return memberPools;
    }

    /// @notice Check if an address has bid in a specific pool
    /// @param poolId Pool to check
    /// @param member Address to query
    /// @return Boolean indicating if the member has bid
    function hasMemberBidInPool(
        uint256 poolId, 
        address member
    ) external view returns (bool) {
        return memberBids[poolId][member] > 0;
    }

}