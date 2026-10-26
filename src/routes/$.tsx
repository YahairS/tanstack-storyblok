import { createFileRoute } from '@tanstack/react-router';
import { fetchStory } from '../lib/fetch-story';
import { StoryView } from '../components/StoryView';

export const Route = createFileRoute('/$')({
  loader: ({ params }) => fetchStory(params._splat || 'home'),
  component: StoryPage,
})

function StoryPage() {
  const { story } = Route.useLoaderData();
  return <StoryView story={story} />
}
