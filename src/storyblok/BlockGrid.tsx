import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import type { BlockGrid as GridBlok } from '@/lib/storyblok-types'

export default function BlockGrid({ blok }: { blok: GridBlok }) {
  return (
    <div {...storyblokEditable(blok)} className="grid grid-cols-3 gap-4" >
      {blok.columns?.map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}
    </div>
  )
}
