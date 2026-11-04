import { apiPlugin, storyblokInit } from '@storyblok/react';
import BlockPage from '@/storyblok/BlockPage';
import BlockGrid from '@/storyblok/BlockGrid';
import BlockTeaser from '@/storyblok/BlockTeaser';
import BlockFeature from '@/storyblok/BlockFeature';
import BlockImageCard from '@/storyblok/BlockImageCard';
import { env } from '@/env';

storyblokInit({
  accessToken: env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
  components: {
    block_page: BlockPage,
    block_grid: BlockGrid,
    block_teaser: BlockTeaser,
    block_feature: BlockFeature,
    block_image_card: BlockImageCard,
  },
});