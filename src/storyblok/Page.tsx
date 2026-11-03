import { StoryblokComponent, storyblokEditable  } from '@storyblok/react';
import type {SbBlokData} from '@storyblok/react';

export default function Page({ blok }: { blok: SbBlokData & { body?: SbBlokData[] } }) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.body?.map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}
    </div>
  );
}