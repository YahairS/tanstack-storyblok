import { storyblokEditable } from '@storyblok/react';
import type { SbBlokData } from '@storyblok/react';
import { ContentCard } from '@/components/ContentCard';

export default function Feature({ blok }: { blok: SbBlokData & { name?: string; description?: string } }) {
  return (
    <ContentCard
      title={blok.name}
      description={blok.description}
      {...storyblokEditable(blok)}
    />
  );
}
