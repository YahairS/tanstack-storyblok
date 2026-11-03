import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { FeatureCard } from '@/components/FeatureCard'
import { MediaCard } from '@/components/MediaCard'

export const Route = createFileRoute('/ui')({
  component: UiSandBox,
})

const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
const sizes = ['xs', 'sm', 'default', 'lg'] as const

function UiSandBox() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Button UI Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Button UI Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Button UI Disabled</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Button UI Links</h2>
        <div className='flex flex-wrap items-center gap-3'>
          <Button asChild>
            <Link to="/ui">Link</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/ui">Link</Link>
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Feature Card</h2>
        <div className="grid grid-cols-3 gap-4">
          <FeatureCard title="Feature 1" description="This is the description for feature 1." />
          <FeatureCard title="Feature 2" description="This is the description for feature 2." />
          <FeatureCard  title="Feature 3" />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Media Card</h2>
        <div className="grid grid-cols-3 gap-4">
          <MediaCard title="Media 1" description="This is the description for media 1." imageAlt="Media 1" imageSrc="/placeholder.svg" />
          <MediaCard title="Media 2" description="This is the description for media 2." imageAlt="Media 2" imageSrc="/placeholder.svg" />
          <MediaCard title="Media 3" description="This is the description for media 3." imageAlt="Media 3" imageSrc="/placeholder.svg" />
        </div>
      </section>
    </main>
  )
}
