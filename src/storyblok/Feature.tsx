import { storyblokEditable  } from '@storyblok/react';
import type {SbBlokData} from '@storyblok/react';
import { FeatureCard } from '@/components/FeatureCard';

export default function Feature({ blok }: { blok: SbBlokData & { name?: string; description?: string } }) {
  return (
    <FeatureCard 
      title={blok.name}
      description={blok.description} 
      {...storyblokEditable(blok)}
    />
  );
}