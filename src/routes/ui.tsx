import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ContentCard } from '@/components/ContentCard'
import { Field, FieldDescription, FieldLegend, FieldGroup, FieldSet, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/ui')({
  component: UiSandBox,
})

// UI Sandbox for testing and showcasing UI components 
// Buttons considering variants, sizes, disabled state, and links
const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
const sizes = ['xs', 'sm', 'default', 'lg'] as const

// Badge variants
const badgeVariants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const

function UiSandBox() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Typography — base styles</h2>
        <div className="max-w-none">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>Párrafo normal. El texto base hereda Manrope desde el body.</p>
          <p>
            <em>Párrafo en itálica</em>, para énfasis suave.
          </p>
          <p>
            <strong>Párrafo en negrita</strong>, para énfasis fuerte.
          </p>
          <ul>
            <li>Primer item de la lista desordenada</li>
            <li>Segundo item</li>
            <li>Tercer item</li>
          </ul>
          <ol>
            <li>Primer item de la lista ordenada</li>
            <li>Segundo item</li>
            <li>Tercer item</li>
          </ol>
        </div>
      </section>
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
      <section className="w-full max-w-md">
        <form className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <FieldSet className="flex">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" type="text" placeholder="Max Leiter" />
                <FieldDescription>
                  Choose a unique username for your account.
                </FieldDescription>
                <FieldError>Validation message.</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                <Input id="password" type="password" placeholder="••••••••" />
                <FieldError>Validation message.</FieldError>
              </Field>
              <FieldSet>
                <FieldLegend>Billing Address</FieldLegend>
                <FieldDescription>
                  The billing address associated with your payment method
                </FieldDescription>
                <FieldGroup>
                  <Field orientation="horizontal">
                    <Checkbox
                      id="checkout-7j9-same-as-shipping-wgm"
                      defaultChecked
                    />
                    <FieldLabel
                      htmlFor="checkout-7j9-same-as-shipping-wgm"
                      className="font-normal"
                    >
                      Same as shipping address
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Field>
                <FieldLabel htmlFor="department">Department</FieldLabel>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Choose department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>Select your department or area of work.</FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </section>
      <section className="flex w-full max-w-md flex-col">
          <Accordion type="single" collapsible defaultValue="shipping" className="rounded-xl border bg-card px-6 text-card-foreground shadow-sm">
            <AccordionItem value="shipping">
              <AccordionTrigger>What are your shipping options?</AccordionTrigger>
              <AccordionContent>
                We offer standard (5-7 days), express (2-3 days), and overnight
                shipping. Free shipping on international orders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                Returns accepted within 30 days. Items must be unused and in original
                packaging. Refunds processed within 5-7 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
              <AccordionContent>
                Reach us via email, live chat, or phone. We respond within 24 hours
                during business days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Badge UI Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge asChild>
            <Link to="/ui">Link badge</Link>
          </Badge>
        </div>
      </section>
    </main>
  )
}
