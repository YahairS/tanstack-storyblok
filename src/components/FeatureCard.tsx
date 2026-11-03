import type { ComponentProps } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type FeatureCardProps = {
  title?: string
  description?: string
} & ComponentProps<'div'>;

export function FeatureCard({ title, description, ...rest }: FeatureCardProps) {
  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
    </Card>
  )
}