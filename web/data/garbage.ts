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
  }
];
