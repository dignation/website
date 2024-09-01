import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import netlify from '@astrojs/netlify';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dignation.nz',

  integrations: [starlight({
      title: 'DigNation',
      social: {
          github: 'https://github.com/dignation/website',
      },
      sidebar: [
          {
              label: 'Getting started',
              items: [
                  // Each item here is one entry in the navigation menu.
                  { label: 'How to join', slug: 'getting-started/how-to-join' },
              ],
          },
      ],
      logo: {
          src: './src/assets/logo.png',
        },
  }), tailwind()],

  output: 'server',
  adapter: netlify(),
});