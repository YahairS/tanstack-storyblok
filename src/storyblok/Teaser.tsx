import { storyblokEditable  } from '@storyblok/react';
import type {SbBlokData} from '@storyblok/react';

export default function Teaser({ blok }: { blok: SbBlokData & { headline?: string } }) {
  return <h2 {...storyblokEditable(blok)} >{blok.headline}</h2>;
}