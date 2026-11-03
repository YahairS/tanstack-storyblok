import { storyblokEditable, type SbBlokData } from '@storyblok/react';

export default function Feature({ blok }: { blok: SbBlokData & { name?: string; description?: string } }) {
  return (
    <div {...storyblokEditable(blok)} className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold">{blok.name}</h2>
      <p>{blok.description}</p>
    </div>
  );
}