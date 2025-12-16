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
    title: 'PrivyPlay',
    author: '小海',
    description: 'PrivyPlay 是一款定位于 NAS/自建玩家的 Web 端无损音乐服务，以 Docker 部署的方式提供简洁可控的远程播放体验。应用通过读取宿主机挂载的目标目录，将其中的音频与封面元数据映射到数据库，供浏览、播放与列表管理使用，同时保证对源文件的只读访问。',
    links: {
      repo: 'https://github.com/NMTuan/PrivyPlay',
    },
    tags: ['nas', 'music', 'docker', 'web', 'self-hosted'],
    created_at: '2025-12-16T13:48:00Z',
    updated_at: '2025-12-16T13:48:00Z',
    reference_count: 0,
    status: GarbageStatus.NEW,
  }
];