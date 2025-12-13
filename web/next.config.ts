import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const isGithubActions = process.env.GITHUB_ACTIONS || false;
// Assuming your repo name is 'hzz-gc'. If you rename it, update this line.
const repoName = 'hzz-gc'; 

const nextConfig: NextConfig = {
  output: isGithubActions ? 'export' : 'standalone',
  basePath: isGithubActions ? `/${repoName}` : '',
  images: {
    unoptimized: true, // Required for static export (GH Pages)
  }
};

export default withNextIntl(nextConfig);