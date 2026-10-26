import { apiPlugin, storyblokInit } from '@storyblok/react';
import Page from '../storyblok/Page';
import Grid from '../storyblok/Grid';
import Teaser from '../storyblok/Teaser';
import Feature from '../storyblok/Feature';

storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
  components: {
    page: Page,
    grid: Grid,
    teaser: Teaser,
    feature: Feature,
  },
});