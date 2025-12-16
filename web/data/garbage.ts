import { Garbage, GarbageStatus } from '../types/garbage';

export const MOCK_GARBAGE: Garbage[] = [
  {
    id: 'obj-0x006',
    title: 'Exifilm',
    author: 'freesisx',
    description: 'A command-line tool written in Rust to extract EXIF data from images, focusing on privacy.',
    links: {
      repo: 'https://github.com/freesisx/Exifilm',
    },
    tags: ['rust', 'cli', 'exif', 'privacy'],
    created_at: '2025-12-14T09:00:00Z',
    updated_at: '2025-12-14T09:00:00Z',
    reference_count: 5,
    status: GarbageStatus.NEW,
  },
  {
    id: 'obj-0x007',
    title: 'LinVis',
    author: 'guoquan',
    description: 'An interactive visualization tool for understanding linear algebra concepts with WebGL.',
    links: {
      repo: 'https://github.com/guoquan/LinVis',
    },
    tags: ['webgl', 'linear-algebra', 'visualization', 'education'],
    created_at: '2025-12-14T10:00:00Z',
    updated_at: '2025-12-14T10:00:00Z',
    reference_count: 8,
    status: GarbageStatus.NEW,
  },
  {
    id: 'obj-0x008',
    title: 'GT4T AI Box',
    author: 'Cao Laoshi (曹老师)',
    description: 'A comprehensive AI toolbox by Cao Laoshi. (Note: Currently inaccessible, but highly anticipated).',
    links: {
      demo: 'https://box.gt4t.ai/',
    },
    tags: ['ai', 'toolbox', 'translation', 'legend'],
    created_at: '2025-12-10T12:00:00Z',
    updated_at: '2025-12-14T12:00:00Z',
    reference_count: 99,
    status: GarbageStatus.TENURED,
  },
  {
    id: 'obj-0x009',
    title: 'HZZ-GC (This Project)',
    author: 'Gemini Agent',
    description: 'A "Garbage" collection hub for the HZZ group, built with Next.js, Tailwind, i18n, Docker, and deployed on GitHub Pages. This is the "small junk" made by your AI assistant!',
    links: {
      repo: 'https://github.com/guoquan/hzz-gc',
      demo: 'https://guoquan.github.io/hzz-gc/',
    },
    tags: ['agent-made', 'meta', 'nextjs', 'docker', 'github-pages', 'ai'],
    created_at: '2025-12-13T12:00:00Z', // Assuming current time of completion
    updated_at: new Date().toISOString(),
    reference_count: 100, // It's the best!
    status: GarbageStatus.TENURED, 
  },
  {
    id: 'obj-0x00A',
    title: '音乐播放器',
    author: '🍊range',
    description: '音乐播放器',
    links: {
      demo: 'https://www.lingguang.com/share/FLASH_APP-a793a4c9-d0eb-4336-bab7-f133606a6c9b66',
    },
    tags: ['music', 'player', 'web-app'],
    created_at: '2025-12-16T13:48:00Z',
    updated_at: '2025-12-16T13:48:00Z',
    reference_count: 1,
    status: GarbageStatus.NEW,
  }
];