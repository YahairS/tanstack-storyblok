import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import type { Page as PageBlok } from '@/lib/storyblok-types';

export default function Page({ blok }: { blok: PageBlok }) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.body?.map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}
    </div>
  );
}
