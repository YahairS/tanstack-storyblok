import { storyblokEditable } from '@storyblok/react';
import type { BlockTeaser as TeaserBlok } from '@/lib/storyblok-types';

export default function BlockTeaser({ blok }: { blok: TeaserBlok }) {
  return <h2 {...storyblokEditable(blok)} >{blok.headline}</h2>;
}
