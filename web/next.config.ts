import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextBuildMode = process.env.NEXT_BUILD_MODE; // e.g., 'static-export'
const enableBasePath = process.env.ENABLE_BASE_PATH === 'true';
// Assuming your repo name is 'hzz-gc'. If you rename it, update this line.
const repoName = 'hzz-gc'; 

const nextConfig: NextConfig = {
  output: nextBuildMode === 'static-export' ? 'export' : 'standalone',
  basePath: enableBasePath ? `/${repoName}` : '',
  images: {
    unoptimized: true, // Always required for static export (GH Pages)
  }
};

export default withNextIntl(nextConfig);