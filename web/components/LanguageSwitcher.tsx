"use client";

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Simple function to switch locale in the path
  // Assumes path starts with /en or /zh
  const switchLocale = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <div className="flex space-x-2 text-xs font-mono border border-green-800 rounded overflow-hidden">
      <Link 
        href={switchLocale('zh')} 
        className={`px-2 py-1 transition-colors ${locale === 'zh' ? 'bg-green-800 text-green-100' : 'bg-gray-900 text-gray-400 hover:text-green-300'}`}
      >
        中文
      </Link>
      <Link 
        href={switchLocale('en')} 
        className={`px-2 py-1 transition-colors ${locale === 'en' ? 'bg-green-800 text-green-100' : 'bg-gray-900 text-gray-400 hover:text-green-300'}`}
      >
        English
      </Link>
    </div>
  );
}
