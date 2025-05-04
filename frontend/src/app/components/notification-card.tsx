import type { LucideIcon } from "lucide-react"

interface NotificationCardProps {
  title: string
  description: string
  time: string
  icon: LucideIcon
  iconColor: string
}

export function NotificationCard({ title, description, time, icon: Icon, iconColor }: NotificationCardProps) {
  return (
    <div className="flex gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50">
      <div
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconColor.replace("text-", "bg-").replace("500", "500/10")}`}
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h4 className="font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
