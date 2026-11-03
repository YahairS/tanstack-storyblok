import { storyblokEditable } from '@storyblok/react';
import type { Teaser as TeaserBlok } from '@/lib/storyblok-types';

export default function Teaser({ blok }: { blok: TeaserBlok }) {
  return <h2 {...storyblokEditable(blok)} >{blok.headline}</h2>;
}
