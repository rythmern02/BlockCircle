import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StepCardProps {
  number: number
  title: string
  description: string
  icon: LucideIcon
}

export function StepCard({ number, title, description, icon: Icon }: StepCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-green-900/20 cyber-border">
      <CardHeader className="relative p-6 pb-0">
        <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500/10 to-green-700/10 text-2xl font-bold text-primary">
          {number}
        </div>
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-xl cyber-text">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
