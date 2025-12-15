"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MOCK_GARBAGE } from '../../data/garbage';
import { GarbageCard } from '../../components/GarbageCard';
import { GarbageStatus } from '../../types/garbage';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function Home() {
  const t = useTranslations('HomePage');
  const tFilters = useTranslations('Filters');
  const locale = useLocale();
  
  const [filter, setFilter] = useState<GarbageStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGarbage = MOCK_GARBAGE.filter(item => {
    const matchesFilter = filter === 'ALL' || item.status === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Calculate stats
  const totalObjects = MOCK_GARBAGE.length;
  const newObjects = MOCK_GARBAGE.filter(g => g.status === GarbageStatus.NEW).length;
  const heapSize = "128MB"; // Fake metric for fun

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header / Console */}
      <header className="bg-gray-900 text-green-400 p-4 shadow-lg sticky top-0 z-50 border-b border-green-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <h1 className="text-2xl font-mono font-bold tracking-tighter">{t('title')}</h1>
            <span className="bg-green-900 text-green-300 text-xs px-2 py-0.5 rounded font-mono">v1.0.0</span>
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>
          
          <div className="font-mono text-xs md:text-sm flex space-x-4 text-gray-400">
            <span>{t('heapSize')}: <span className="text-white">{heapSize}</span></span>
            <span>{t('totalObjects')}: <span className="text-white">{totalObjects}</span></span>
            <span>{t('edenSpace')}: <span className="text-green-400">+{newObjects}</span></span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Intro / Banner */}
        <section className="mb-12 text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('welcome')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            {t('slogan')} <br/>
            <span className="font-mono text-sm text-gray-400">{t('systemOut')}</span>
          </p>
          <div className="flex justify-center space-x-4">
             <a 
               href="https://github.com/guoquan/hzz-gc/issues/new?template=submission.yml" 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition flex items-center"
             >
               {t('submit')}
             </a>
             <Link href={`/${locale}/manifesto`} className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition flex items-center">
               {t('manifesto')}
             </Link>
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <a href="https://github.com/guoquan/hzz-gc" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 flex items-center space-x-1">
              <span className="text-xl">🐙</span>
              <span>{t('githubRepo')}</span>
            </a>
            <a href="https://guoquan.github.io/hzz-gc/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 flex items-center space-x-1">
              <span className="text-xl">🚀</span>
              <span>{t('liveDemo')}</span>
            </a>
          </div>

          <div className="flex justify-center mt-4 space-x-2 flex-wrap">
            <a href="https://github.com/guoquan/hzz-gc/actions/workflows/deploy.yml" target="_blank" rel="noopener noreferrer">
              <img alt="GitHub Actions workflow status" src="https://img.shields.io/github/actions/workflow/status/guoquan/hzz-gc/deploy.yml?branch=main&style=flat-square">
            </a>
            <a href="https://github.com/guoquan/hzz-gc/stargazers" target="_blank" rel="noopener noreferrer">
              <img alt="GitHub Stars" src="https://img.shields.io/github/stars/guoquan/hzz-gc?style=flat-square">
            </a>
            <a href="https://github.com/guoquan/hzz-gc/commits/main" target="_blank" rel="noopener noreferrer">
              <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/guoquan/hzz-gc/main?style=flat-square">
            </a>
          </div>
        </section>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          {/* Tabs */}
          <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm overflow-x-auto max-w-full">
            <button 
              onClick={() => setFilter('ALL')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === 'ALL' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tFilters('all')}
            </button>
            <button 
              onClick={() => setFilter(GarbageStatus.NEW)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === GarbageStatus.NEW ? 'bg-green-50 text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tFilters('new')}
            </button>
            <button 
              onClick={() => setFilter(GarbageStatus.TENURED)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === GarbageStatus.TENURED ? 'bg-amber-50 text-amber-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tFilters('tenured')}
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Grid */}
        {filteredGarbage.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGarbage.map(item => (
              <GarbageCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 font-mono whitespace-pre-wrap">
            {t('noResults')}
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto p-8 text-center text-gray-400 text-sm font-mono border-t border-gray-200 mt-12">
        <p>{t('footerRuntime')}</p>
        <p className="mt-2">{t('footerDev')}</p>
      </footer>
    </div>
  );
}
