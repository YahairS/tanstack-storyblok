import { StoryblokComponent, storyblokEditable, type SbBlokData } from '@storyblok/react'

export default function Grid({ blok }: { blok: SbBlokData & { columns?: SbBlokData[] } }) {
  return (
    <div {...storyblokEditable(blok)} className="grid grid-cols-3 gap-4" >
      {blok.columns?.map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}
    </div>
  )
}