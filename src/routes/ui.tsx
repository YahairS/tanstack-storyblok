import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ContentCard } from '@/components/ContentCard'

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
        <h2 className="text-xl font-bold">Content Card with image</h2>
        <div className="grid grid-cols-3 gap-4">
          <ContentCard title="Content 1" description="This is the description for content 1." imageAlt="Content 1" imageSrc="/placeholder.svg" />
          <ContentCard title="Content 2" description="This is the description for content 2." imageAlt="Content 2" imageSrc="/placeholder.svg" />
          <ContentCard title="Content 3" imageAlt="Content 3" imageSrc="/placeholder.svg" />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Content Card without image</h2>
        <div className="grid grid-cols-3 gap-4">
          <ContentCard title="Content 1" description="This is the description for content 1." />
          <ContentCard title="Content 2" description="This is the description for content 2." />
          <ContentCard title="Content 3" />
        </div>
      </section>
    </main>
  )
}
