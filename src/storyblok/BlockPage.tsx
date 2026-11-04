import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import type { BlockPage as PageBlok } from '@/lib/storyblok-types';

export default function BlockPage({ blok }: { blok: PageBlok }) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.body?.map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}
    </div>
  );
}
