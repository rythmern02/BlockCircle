import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  gradient: string
}

export function FeatureCard({ title, description, gradient }: FeatureCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-green-900/20 cyber-border">
      <CardHeader className="relative p-6">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 transition-opacity duration-300 group-hover:opacity-20 cyber-grid`}
        ></div>
        <div className="relative">
          <CardTitle className="text-xl cyber-text">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
