import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface TeamMemberProps {
  name: string
  role: string
  imageUrl: string
}

export function TeamMember({ name, role, imageUrl }: TeamMemberProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-purple-900/20">
      <div className="relative h-48 w-48 overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={200}
          height={200}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4 text-center">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </CardContent>
    </Card>
  )
}
