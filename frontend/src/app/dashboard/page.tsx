'use client'

import { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BarChart, Wallet, Award, Settings, Zap, TrendingUp, DollarSign, Users, User } from 'lucide-react'
import { ethers } from 'ethers'
import { motion, AnimatePresence } from 'framer-motion'

const Auction_Contract_Address = "0xE74621B574d5c246afa435bc87a9A503AA412661"
const Auction_Contract_ABI: any = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_stablecoinAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "winningBid",
				"type": "uint256"
			}
		],
		"name": "AuctionClosed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "member",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"name": "BidPlaced",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			}
		],
		"name": "closeAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "member",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "CollateralReleased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "contribute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "member",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ContributionReceived",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "numParticipants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalPoolAmount",
				"type": "uint256"
			}
		],
		"name": "createPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "member",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "initialReputationPoints",
				"type": "uint256"
			}
		],
		"name": "MemberRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "cycleDuration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requiredContribution",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "participantCount",
				"type": "uint256"
			}
		],
		"name": "PoolCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			}
		],
		"name": "processWinnerPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			}
		],
		"name": "releaseCollateral",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WinnerPaymentProcessed",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "BASE_REPUTATION_POINTS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CYCLE_DURATION",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getActivePools",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getClosedPools",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "member",
				"type": "address"
			}
		],
		"name": "getMemberInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalContributions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reputation",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "poolsParticipated",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cyclesContributed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "activeCollateral",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "member",
				"type": "address"
			}
		],
		"name": "getMemberPools",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			}
		],
		"name": "getPoolBids",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "bidder",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bidAmount",
						"type": "uint256"
					}
				],
				"internalType": "struct CommunityAuction.BidInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			}
		],
		"name": "getPoolInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cycleDuration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalPoolAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentPoolAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "auctionDeadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "winningBid",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isClosed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "requiredContribution",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			}
		],
		"name": "getPoolParticipants",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "member",
				"type": "address"
			}
		],
		"name": "hasMemberBidInPool",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_PARTICIPANTS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "memberBids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "members",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalContributions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reputationPoints",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "poolsParticipated",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cyclesContributed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "activeCollateral",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_CONTRIBUTION",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "poolCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "poolParticipants",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pools",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cycleDuration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalPoolAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentPoolAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "auctionDeadline",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "winningBid",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isClosed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "requiredContribution",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stablecoin",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "WINNER_REPUTATION_BONUS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
function useContract() {
  const [contract, setContract] = useState(null)
  const [account, setAccount] = useState('')
  const [error, setError] = useState('')

  const connectContract = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])

        // Create Web3Provider and Contract instance
        const provider = new ethers.BrowserProvider(window.ethereum, {
          name: 'Unknown Network',
          chainId: 656476
        })
        
        const signer = await provider.getSigner()
        const contractInstance: any = new ethers.Contract(Auction_Contract_Address, Auction_Contract_ABI, signer)
        
        setContract(contractInstance)
      } else {
        setError('Please install MetaMask!')
      }
    } catch (err: any) {
      setError('Error connecting to contract: ' + err.message)
    }
  }

  useEffect(() => {
    connectContract()
  }, [])

  return { contract, account, error }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { contract, account, error } = useContract()

  useEffect(() => {
    if (error) {
      console.error(error)
      // You might want to show this error to the user in the UI
    }
  }, [error])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent contract={contract} account={account} />
      case 'profile':
        return <ProfileContent contract={contract} account={account} />
      case 'contributions':
        return <ContributionsContent contract={contract} account={account} />
      case 'auctions':
        return <AuctionsContent contract={contract} account={account} />
      case 'lottery':
        return <LotteryContent contract={contract} account={account} />
      case 'settings':
        return <SettingsContent contract={contract} account={account} />
      default:
        return <DashboardContent contract={contract} account={account} />
    }
  }
  console.log("the wallet connected is: ", account)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 flex">
        <aside className="w-64 mr-8">
          <nav className="space-y-2">
            {[
              { name: 'Dashboard', icon: <BarChart className="mr-3" />, id: 'dashboard', color: 'from-purple-500 to-pink-500' },
              { name: 'Profile', icon: <User className="mr-3" />, id: 'profile', color: 'from-blue-500 to-cyan-500' },
              { name: 'My Contributions', icon: <Wallet className="mr-3" />, id: 'contributions', color: 'from-green-500 to-teal-500' },
              { name: 'Auctions', icon: <Award className="mr-3" />, id: 'auctions', color: 'from-yellow-500 to-orange-500' },
              { name: 'Lottery', icon: <Zap className="mr-3" />, id: 'lottery', color: 'from-blue-500 to-indigo-500' },
              { name: 'Settings', icon: <Settings className="mr-3" />, id: 'settings', color: 'from-red-500 to-pink-500' },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                  activeTab === item.id 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                {item.name}
              </motion.button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 bg-gray-800 rounded-lg p-6 shadow-lg">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  )
}

function DashboardContent({ contract, account }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Balance', value: '5,280 SOL', icon: <DollarSign className="h-8 w-8" />, color: 'from-green-400 to-blue-500' },
          { title: 'Active Chits', value: '3', icon: <Users className="h-8 w-8" />, color: 'from-purple-400 to-pink-500' },
          { title: 'Next Auction', value: '2d 5h 30m', icon: <Award className="h-8 w-8" />, color: 'from-yellow-400 to-orange-500' },
          { title: 'Profit/Loss', value: '+210 SOL', icon: <TrendingUp className="h-8 w-8" />, color: 'from-blue-400 to-indigo-500' },
        ].map((item, index) => (
          <div key={index} className={`bg-gradient-to-br ${item.color} p-6 rounded-lg shadow-lg`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-100">{item.title}</p>
                <p className="text-2xl font-bold text-white mt-2">{item.value}</p>
              </div>
              <div className="bg-white bg-opacity-30 p-3 rounded-full">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-4">
          {[
            { action: 'Contributed to Chit #1', amount: '100 SOL', time: '2 hours ago' },
            { action: 'Won Auction for Chit #2', amount: '500 SOL', time: '1 day ago' },
            { action: 'Joined new Chit Fund', amount: '50 SOL', time: '3 days ago' },
          ].map((activity, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-600 pb-2">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
              <span className="text-green-400 font-semibold">{activity.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ContributionsContent({ contract, account }: any) {
  const [memberInfo, setMemberInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [contributions, setContributions] = useState<any[]>([])

  // Function to fetch member info
  const fetchMemberInfo = async () => {
    if (!contract || !account) return
    setIsLoading(true)
    try {
      const info = await contract.getMemberInfo(account)
      setMemberInfo({
        totalContributions: ethers.formatEther(info.totalContributions),
        reputation: info.reputation.toString(),
        poolsParticipated: info.poolsParticipated.toString(),
        cyclesContributed: info.cyclesContributed.toString(),
        activeCollateral: ethers.formatEther(info.activeCollateral)
      })

      // Fetch member's pools
      const memberPools = await contract.getMemberPools(account)
      const contributions = await Promise.all(
        memberPools.map(async (poolId: any) => {
          const pool = await contract.getPoolInfo(poolId)
          return {
            amount: ethers.formatEther(pool.requiredContribution),
            timestamp: new Date(Number(pool.auctionDeadline) * 1000).toLocaleString()
          }
        })
      )
      setContributions(contributions)
    } catch (err: any) {
      console.error("Error fetching member info:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (contract && account) {
      fetchMemberInfo()
    }
  }, [contract, account])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-600">
        My Contributions
      </h2>

      {/* Member Stats */}
      {memberInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Total Contributions</p>
            <p className="text-2xl font-bold">{memberInfo.totalContributions} SOL</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Pools Participated</p>
            <p className="text-2xl font-bold">{memberInfo.poolsParticipated}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Active Collateral</p>
            <p className="text-2xl font-bold">{memberInfo.activeCollateral} SOL</p>
          </div>
        </div>
      )}

      {/* Contribution History */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Contribution History</h3>
        {contributions.length > 0 ? (
          <div className="space-y-4">
            {contributions.map((contribution, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-600 pb-2">
                <div>
                  <p className="font-medium">Contribution</p>
                  <p className="text-sm text-gray-400">{contribution.timestamp}</p>
                </div>
                <span className="text-green-400 font-semibold">{contribution.amount} SOL</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-4">No contributions found</p>
        )}
      </div>

      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  )
}

function AuctionsContent({ contract, account }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [bids, setBids] = useState<any[]>([])
  const [bidAmount, setBidAmount] = useState('')
  const [totalFunds, setTotalFunds] = useState('')
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({
    bids: false,
    creation: false,
    closing: false,
    bidding: false
  })
  const [error, setError] = useState('')
  const [auctions, setAuctions] = useState<any[]>([])
  const [formData, setFormData] = useState({
    numParticipants: '',
    totalPoolAmount: ''
  })

  const fetchBidsForAuction = async (poolId: number) => {
    if (!contract) return
    setIsLoading(prev => ({ ...prev, bids: true }))
    try {
      const bidsData = await contract.getPoolBids(BigInt(poolId))
      if (bidsData) {
        const formattedBids = bidsData.map((bid: any) => ({
          bidder: bid.bidder,
          amount: ethers.formatEther(bid.bidAmount)
        }))
        setBids(formattedBids)
      }
    } catch (err: any) {
      console.error("Error fetching bids:", err)
      setError(err?.message || "Failed to fetch bids")
    } finally {
      setIsLoading(prev => ({ ...prev, bids: false }))
    }
  }

  const handleAuctionSelect = async (auction: any) => {
    setSelectedAuction(auction)
    await fetchBidsForAuction(Number(auction.poolId))
  }

  useEffect(() => {
    if (selectedAuction) {
      fetchBidsForAuction(selectedAuction.poolId)
    }
  }, [selectedAuction, contract])

  const handleStartNewCycle = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(prev => ({ ...prev, creation: true }))
    setError('')

    try {
      if (!contract) throw new Error('Contract not connected')
      
      const numParticipants = parseInt(formData.numParticipants)
      const totalPoolAmount = ethers.parseEther(formData.totalPoolAmount)
      
      const tx = await contract.createPool(numParticipants, totalPoolAmount)
      await tx.wait()
      
      await fetchAuctions()
      setFormData({ numParticipants: '', totalPoolAmount: '' })
      setIsModalOpen(false)
    } catch (err: any) {
      setError(`Failed to create pool: ${err.message}`)
    } finally {
      setIsLoading(prev => ({ ...prev, creation: false }))
    }
  }

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(prev => ({ ...prev, bidding: true }))
    setError('')

    try {
      if (!contract) throw new Error('Contract not connected')
      const bidAmountInWei = ethers.parseEther(bidAmount)
      const tx = await contract.placeBid(selectedAuction.poolId, bidAmountInWei)
      await tx.wait()
      
      await fetchBidsForAuction(selectedAuction.poolId)
      setBidAmount('')
    } catch (err: any) {
      setError(`Failed to place bid: ${err.message}`)
    } finally {
      setIsLoading(prev => ({ ...prev, bidding: false }))
    }
  }

  const handleCloseAuction = async (poolId: number) => {
    setIsLoading(prev => ({ ...prev, closing: true }))
    setError('')
    
    try {
      if (!contract) throw new Error('Contract not connected')
      const tx = await contract.closeAuction(poolId)
      await tx.wait()
      
      await fetchAuctions()
      setSelectedAuction(null)
    } catch (err: any) {
      setError(`Failed to close auction: ${err.message}`)
    } finally {
      setIsLoading(prev => ({ ...prev, closing: false }))
    }
  }

  const fetchAuctions = async () => {
    if (!contract) return
    try {
      // Get active and closed pools
      const activePools = await contract.getActivePools()
      const closedPools = await contract.getClosedPools()
      const allPools = [...activePools, ...closedPools]
      
      const auctionsData = await Promise.all(
        allPools.map(async (poolId) => {
          const pool = await contract.getPoolInfo(poolId)
          return {
            poolId: pool.id.toString(),
            totalFunds: pool.totalPoolAmount,
            deadline: pool.auctionDeadline.toString(),
            winningBid: pool.winningBid,
            winner: pool.winner,
            isClosed: pool.isClosed,
            requiredContribution: pool.requiredContribution
          }
        })
      )
      
      setAuctions(auctionsData)
    } catch (err: any) {
      console.error("Error fetching auctions:", err)
      setError(`Failed to fetch auctions: ${err.message}`)
    }
  }

  useEffect(() => {
    if (contract) {
      fetchAuctions()
    }
  }, [contract])

  useEffect(() => {
    if (!contract) return

    const contributionFilter = contract.filters.ContributionReceived()
    const poolCreatedFilter = contract.filters.PoolCreated()
    const bidPlacedFilter = contract.filters.BidPlaced()
    const auctionClosedFilter = contract.filters.AuctionClosed()
    const winnerPaymentFilter = contract.filters.WinnerPaymentProcessed()

    const handleNewContribution = async () => {
      // Refresh member info
      if (account) {
        // Since fetchMemberInfo is not available in this component,
        // we'll need to emit an event or use a callback passed as prop
        // For now, just fetch auctions which we know exists
        await fetchAuctions()
      }
    }

    const handlePoolCreated = async () => {
      await fetchAuctions()
    }

    const handleBidPlaced = async () => {
      await fetchAuctions()
      if (selectedAuction) {
        await fetchBidsForAuction(selectedAuction.poolId)
      }
    }

    contract.on(contributionFilter, handleNewContribution)
    contract.on(poolCreatedFilter, handlePoolCreated)
    contract.on(bidPlacedFilter, handleBidPlaced)
    contract.on(auctionClosedFilter, handlePoolCreated)
    contract.on(winnerPaymentFilter, handleNewContribution)

    return () => {
      contract.off(contributionFilter, handleNewContribution)
      contract.off(poolCreatedFilter, handlePoolCreated)
      contract.off(bidPlacedFilter, handleBidPlaced)
      contract.off(auctionClosedFilter, handlePoolCreated)
      contract.off(winnerPaymentFilter, handleNewContribution)
    }
  }, [contract, account, selectedAuction])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
          Auctions
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg 
                     hover:from-purple-600 hover:to-pink-600 transition-all duration-200 
                     flex items-center space-x-2"
        >
          <span className="text-white font-semibold">Create BlockCircle</span>
          <Award className="h-5 w-5" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Create New BlockCircle
            </h3>

            <form onSubmit={handleStartNewCycle} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Participants
                </label>
                <input
                  type="number"
                  value={formData.numParticipants}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    numParticipants: e.target.value
                  }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter number of participants"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Total Pool Amount (SOL)
                </label>
                <input
                  type="number"
                  value={formData.totalPoolAmount}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    totalPoolAmount: e.target.value
                  }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter amount in SOL"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading.creation}
                className={`w-full py-3 rounded-lg font-semibold text-white
                          ${isLoading.creation 
                            ? 'bg-gray-600' 
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                          } transition-all duration-200`}
              >
                {isLoading.creation ? 'Creating...' : 'Create BlockCircle'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {auctions?.map((auction: any, index: number) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-white">BlockCircle #{auction.poolId.toString()}</h4>
                <p className="text-gray-400">Pool Size: {ethers.formatEther(auction.totalFunds)} SOL</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                auction.isClosed ? 'bg-gray-600' : 'bg-green-500'
              }`}>
                {auction.isClosed ? 'Completed' : 'Active'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current Lowest Bid</span>
                <span className="text-white font-medium">
                  {auction.winningBid.toString() === ethers.MaxUint256.toString() 
                    ? 'No bids yet'
                    : `${ethers.formatEther(auction.winningBid)} SOL`
                  }
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAuctionSelect(auction)}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                View Auction Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Auction Detail Modal */}
      {selectedAuction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-6 m-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">BlockCircle #{selectedAuction.poolId.toString()}</h3>
              <button
                onClick={() => {
                  setSelectedAuction(null)
                  setBids([])
                }}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400">Total Pool</p>
                <p className="text-2xl font-bold">{ethers.formatEther(selectedAuction.totalFunds)} SOL</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400">Current Lowest Bid</p>
                <p className="text-2xl font-bold">
                  {selectedAuction.winningBid.toString() === ethers.MaxUint256.toString()
                    ? 'No bids yet'
                    : `${ethers.formatEther(selectedAuction.winningBid)} SOL`
                  }
                </p>
              </div>
            </div>

            {/* Bid History Section */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4">Bid History</h4>
              {isLoading.bids ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : bids && bids.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {bids.map((bid, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center bg-gray-600 p-3 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      <div>
                        <p className="text-sm text-gray-400">Bidder</p>
                        <p className="font-medium">
                          {bid.bidder.slice(0, 6)}...{bid.bidder.slice(-4)}
                          {bid.bidder.toLowerCase() === account?.toLowerCase() && (
                            <span className="ml-2 text-xs bg-purple-500 px-2 py-1 rounded-full">You</span>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Amount</p>
                        <p className="font-medium text-green-400">
                          {bid.amount} SOL
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-4">No bids placed yet</p>
              )}
            </div>

            {/* Place Bid Form */}
            {!selectedAuction.isClosed && (
              <form onSubmit={handlePlaceBid} className="mt-6">
                <div className="flex space-x-4">
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter bid amount in SOL"
                    step="0.000000000000000001"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading.bidding}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white disabled:opacity-50 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                  >
                    {isLoading.bidding ? 'Placing Bid...' : 'Place Bid'}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 mt-2 text-sm">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function LotteryContent({ contract, account }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">Lottery</h2>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Current Lottery</h3>
        <div className="bg-gray-600 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">Chit #2 Lottery</h4>
            <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded">Active</span>
          </div>
          <p className="text-2xl font-bold text-center mb-4">Prize Pool: 1000 SOL</p>
          <div className="flex justify-between items-center mb-4">
            <span>Time Left:</span>
            <span className="text-xl font-semibold text-blue-400">6d 12h 30m</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span>Your Tickets:</span>
            <span className="text-xl font-semibold">5</span>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600">Buy More Tickets</button>
        </div>
      </div>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Previous Winners</h3>
        <ul className="space-y-2">
          {[
            { name: 'Alice', amount: '800 SOL', date: '2 weeks ago' },
            { name: 'Bob', amount: '750 SOL', date: '1 month ago' },
            { name: 'Charlie', amount: '900 SOL', date: '2 months ago' },
          ].map((winner, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-600 pb-2">
              <div>
                <p className="font-medium">{winner.name}</p>
                <p className="text-sm text-gray-400">{winner.date}</p>
              </div>
              <span className="text-green-400 font-semibold">{winner.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SettingsContent({ contract, account }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-600">Settings</h2>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input type="text" id="username" name="username" className="w-full bg-gray-600 text-white rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-gray-600 text-white rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="wallet" className="block text-sm font-medium text-gray-300 mb-1">Connected Wallet</label>
            <input type="text" id="wallet" name="wallet" className="w-full bg-gray-600 text-white rounded-md px-3 py-2" disabled />
          </div>
          <button className="w-full bg-gradient-to-r from-red-500 to-pink-600">Save Changes</button>
        </form>
      </div>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-2">
          {[
            'Email notifications',
            'Push notifications',
            'SMS alerts',
            'Auction reminders',
            'Contribution due alerts',
          ].map((pref, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{pref}</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProfileContent({ contract, account }: any) {
  const [profileData, setProfileData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProfileData = useCallback(async () => {
    if (!contract || !account) {
      setIsLoading(false)
      return
    }

    try {
      const memberInfo = await contract.getMemberInfo(account)
      const memberPools = await contract.getMemberPools(account)
      
      setProfileData({
        totalContributions: ethers.formatEther(memberInfo.totalContributions),
        reputationPoints: memberInfo.reputation.toString(),
        poolsParticipated: memberInfo.poolsParticipated.toString(),
        cyclesContributed: memberInfo.cyclesContributed.toString(),
        activeCollateral: ethers.formatEther(memberInfo.activeCollateral),
        activePools: memberPools.length
      })
    } catch (err: any) {
      console.error("Error fetching profile data:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [contract, account])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-500/10 rounded-lg">
        Error loading profile: {error}
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Please connect your wallet to view your profile</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
        User Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Total Contributions',
            value: `${profileData.totalContributions} SOL`,
            icon: <Wallet className="h-6 w-6" />,
            color: 'from-green-400 to-emerald-600'
          },
          {
            title: 'Reputation Points',
            value: profileData.reputationPoints,
            icon: <Award className="h-6 w-6" />,
            color: 'from-yellow-400 to-orange-600'
          },
          {
            title: 'Active Collateral',
            value: `${profileData.activeCollateral} SOL`,
            icon: <DollarSign className="h-6 w-6" />,
            color: 'from-purple-400 to-pink-600'
          },
          {
            title: 'Active Pools',
            value: profileData.activePools,
            icon: <Users className="h-6 w-6" />,
            color: 'from-blue-400 to-indigo-600'
          },
          {
            title: 'Cycles Contributed',
            value: profileData.cyclesContributed,
            icon: <TrendingUp className="h-6 w-6" />,
            color: 'from-red-400 to-rose-600'
          },
          {
            title: 'Pools Participated',
            value: profileData.poolsParticipated,
            icon: <BarChart className="h-6 w-6" />,
            color: 'from-teal-400 to-cyan-600'
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className={`bg-gradient-to-br ${item.color} p-6 rounded-lg shadow-lg`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-100 opacity-80">{item.title}</p>
                <p className="text-2xl font-bold text-white mt-2">{item.value}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                {item.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Account Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Wallet Address</span>
            <span className="font-mono">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Member Since</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
