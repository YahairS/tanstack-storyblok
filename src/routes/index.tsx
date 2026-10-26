import { createFileRoute } from '@tanstack/react-router';
import { fetchStory } from '../lib/fetch-story';
import { StoryView } from '../components/StoryView';


export const Route = createFileRoute('/')({
  loader: () => fetchStory('home'),
  component: HomePage,
})

function HomePage() {
  const { story } = Route.useLoaderData();
  return <StoryView story={story} />
}
