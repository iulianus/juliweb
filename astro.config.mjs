import { defineConfig } from 'astro/config';
export default defineConfig({site:process.env.SITE_URL || 'https://juliweb.net.ar',base:process.env.BASE_PATH || '/',output:'static',trailingSlash:'always'});
