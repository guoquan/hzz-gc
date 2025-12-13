import React from 'react';
import { useTranslations } from 'next-intl';
import { Garbage, GarbageStatus } from '../types/garbage';

interface GarbageCardProps {
  item: Garbage;
}

const statusColors = {
  [GarbageStatus.NEW]: 'bg-green-100 text-green-800 border-green-200',
  [GarbageStatus.SURVIVOR]: 'bg-blue-100 text-blue-800 border-blue-200',
  [GarbageStatus.TENURED]: 'bg-amber-100 text-amber-800 border-amber-200',
  [GarbageStatus.UNREACHABLE]: 'bg-gray-100 text-gray-800 border-gray-200 opacity-60',
};

// Status labels are now handled by i18n
// But we still need the color mapping logic

export const GarbageCard: React.FC<GarbageCardProps> = ({ item }) => {
  const t = useTranslations('Card');

  return (
    <div className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full ${statusColors[item.status].split(' ')[2]}`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs px-2 py-1 rounded-full font-mono font-bold ${statusColors[item.status]}`}>
          {t(`status.${item.status}`)}
        </span>
        <span className="text-xs text-gray-400 font-mono" title={item.created_at}>
           {t('addr')}: {item.id}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
      <p className="text-sm text-gray-500 mb-4 font-mono">@{item.author}</p>
      
      <p className="text-gray-700 text-sm mb-4 flex-grow">{item.description}</p>
      
      {item.prompt && (
        <div className="mb-4 bg-gray-50 p-2 rounded text-xs font-mono text-gray-600 border border-gray-200 overflow-hidden">
          <span className="font-bold text-gray-500 mb-1 block">✨ {t('prompt')}:</span>
          <p className="whitespace-pre-wrap break-words">{item.prompt}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags.map(tag => (
          <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="flex flex-wrap gap-3 text-sm">
          {item.links.repo && (
            <a href={item.links.repo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium flex items-center">
              <span className="mr-1">📦</span> {t('repo')}
            </a>
          )}
          {item.links.demo && (
            <a href={item.links.demo} target="_blank" rel="noopener noreferrer" className={`${!item.links.repo ? 'text-green-700 font-bold' : 'text-emerald-600'} hover:underline font-medium flex items-center`}>
              <span className="mr-1">🚀</span> {item.links.repo ? t('demo') : t('visit')}
            </a>
          )}
          {item.links.download && (
            <a href={item.links.download} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline font-medium flex items-center">
              <span className="mr-1">wq</span> {t('download')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};