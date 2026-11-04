import { storyblokEditable } from '@storyblok/react';
import type { BlockFeature as FeatureBlok } from '@/lib/storyblok-types';
import { ContentCard } from '@/components/ContentCard';

export default function BlockFeature({ blok }: { blok: FeatureBlok }) {
  return (
    <ContentCard
      title={blok.name}
      description={blok.description}
      {...storyblokEditable(blok)}
    />
  );
}
