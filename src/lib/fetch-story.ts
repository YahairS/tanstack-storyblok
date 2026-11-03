import { getStoryblokApi  } from '@storyblok/react';
import type {ISbStoryData} from '@storyblok/react';
import { notFound } from '@tanstack/react-router';

export async function fetchStory(slug: string): Promise<{ story: ISbStoryData }> {
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: import.meta.env.DEV ? 'draft' : 'published', 
    })
    return { story: data.story as ISbStoryData };
  } catch (error) {
    if ((error as { status?: number }).status === 404) throw notFound();
    throw error;
  }
}