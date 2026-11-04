import { storyblokEditable } from "@storyblok/react";
import type { BlockImageCard as ImageCardBlok } from "@/lib/storyblok-types";
import { ContentCard } from "@/components/ContentCard";

export default function BlockImageCard({ blok }: { blok: ImageCardBlok }) {
  return (
    <ContentCard
      title={blok.title}
      description={blok.description}
      imageSrc={blok.image?.filename ?? undefined}
      imageAlt={blok.image?.alt ?? undefined}
      {...storyblokEditable(blok)}
    />
  );
}