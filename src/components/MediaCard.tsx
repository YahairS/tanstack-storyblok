import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type MediaCardProps = {
  title?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
} & ComponentPropsWithoutRef<'div'>

export function MediaCard({ title, description, imageSrc, imageAlt = '', className, ...rest }: MediaCardProps) {
  return (
    <Card className={cn('overflow-hidden pt-0', className) } {...rest}>
      {imageSrc ? (
        <div className="relative">
          <img 
            src={imageSrc}
            alt={imageAlt}
            className="aspect-video w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/35" />
        </div>
      ) : null}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
    </Card>
  )
}