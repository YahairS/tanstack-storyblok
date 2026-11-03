import { StoryblokComponent, useStoryblokState  } from '@storyblok/react';
import type {ISbStoryData} from '@storyblok/react';

export function StoryView({ story }: { story: ISbStoryData }) {
  const liveStory = useStoryblokState(story);

  if (!liveStory?.content) return null
  return <StoryblokComponent blok={liveStory.content} />
}