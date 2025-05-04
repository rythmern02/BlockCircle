import { Clock, DollarSign, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AuctionCardProps {
  poolName: string
  currentBid: string
  yourBid: string
  timeRemaining: string
  totalContributed: string
  participants: number
  isActive: boolean
  isPast?: boolean
}

export function AuctionCard({
  poolName,
  currentBid,
  yourBid,
  timeRemaining,
  totalContributed,
  participants,
  isActive,
  isPast = false,
}: AuctionCardProps) {
  return (
    <Card className="overflow-hidden bg-background/60 backdrop-blur-sm cyber-border">
      <CardHeader className="relative pb-2">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-700/10 cyber-grid"></div>
        <div className="relative">
          <CardTitle className="text-xl cyber-text">{poolName}</CardTitle>
          <CardDescription>
            {isActive ? "Active auction" : isPast ? "Completed auction" : "Upcoming auction"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Current Bid</p>
            <p className="flex items-center gap-1 font-medium">
              <DollarSign className="h-4 w-4 text-green-500" />
              {currentBid}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Your Bid</p>
            <p className="font-medium">{yourBid}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Time Remaining</p>
            <p className="flex items-center gap-1 font-medium">
              <Clock className="h-4 w-4 text-yellow-500" />
              {timeRemaining}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Participants</p>
            <p className="flex items-center gap-1 font-medium">
              <Users className="h-4 w-4 text-green-500" />
              {participants}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total Contributed</p>
            <p className="text-xs font-medium">{totalContributed}</p>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="absolute inset-0 bg-green-500/5 cyber-grid"></div>
            <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-green-500 to-green-400 glow-effect"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isActive ? (
          <Button className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 glow-effect">
            Place Bid
          </Button>
        ) : isPast ? (
          <Button
            variant="outline"
            className="w-full border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400"
          >
            View Details
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400"
          >
            Set Reminder
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
