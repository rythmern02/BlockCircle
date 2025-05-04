import { Calendar, Clock, Gift, Ticket, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LotteryCardProps {
  poolName: string
  prizeAmount: string
  entries: number
  totalEntries: number
  drawDate: string
  timeRemaining: string
  isActive: boolean
  isPast?: boolean
  winner?: string
}

export function LotteryCard({
  poolName,
  prizeAmount,
  entries,
  totalEntries,
  drawDate,
  timeRemaining,
  isActive,
  isPast = false,
  winner,
}: LotteryCardProps) {
  const entryPercentage = (entries / totalEntries) * 100

  return (
    <Card className="overflow-hidden bg-background/60 backdrop-blur-sm cyber-border">
      <CardHeader className="relative pb-2">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-700/10 cyber-grid"></div>
        <div className="relative">
          <CardTitle className="text-xl cyber-text">{poolName}</CardTitle>
          <CardDescription>
            {isActive ? "Active lottery" : isPast ? "Completed draw" : "Upcoming lottery"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Prize Amount</p>
            <p className="flex items-center gap-1 font-medium">
              <Gift className="h-4 w-4 text-green-500" />
              {prizeAmount}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Your Entries</p>
            <p className="flex items-center gap-1 font-medium">
              <Ticket className="h-4 w-4 text-green-500" />
              {entries}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Draw Date</p>
            <p className="flex items-center gap-1 font-medium">
              <Calendar className="h-4 w-4 text-green-500" />
              {drawDate}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Time Remaining</p>
            <p className="flex items-center gap-1 font-medium">
              <Clock className="h-4 w-4 text-yellow-500" />
              {timeRemaining}
            </p>
          </div>
        </div>

        {isPast && winner && (
          <div className="rounded-md bg-green-500/10 p-3 cyber-border">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Winner</p>
                <p className="text-xs font-mono text-muted-foreground">{winner}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Your Chances</p>
            <p className="text-xs font-medium">
              {entries} of {totalEntries} entries ({entryPercentage.toFixed(1)}%)
            </p>
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
            Get More Entries
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
