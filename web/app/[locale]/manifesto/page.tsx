import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LanguageSwitcher from '../../../../components/LanguageSwitcher';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function Manifesto({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Manifesto'});

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8 md:p-12">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-xl shadow-lg border border-gray-100">
        
        <div className="mb-8 flex justify-between items-center">
          <Link href={`/${locale}`} className="text-green-600 hover:text-green-800 font-mono text-sm flex items-center">
            &larr; {t('back')}
          </Link>
          <LanguageSwitcher />
        </div>

        <header className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-500 font-light italic">
            {t('subtitle')}
          </p>
          <div className="mt-4 p-4 bg-gray-50 border-l-4 border-green-500 text-gray-600 italic">
             {t('quote')}
          </div>
        </header>

        <article className="prose prose-lg prose-green max-w-none">
          <h3>{t('conceptsTitle')}</h3>
          <p>{t('conceptsIntro')}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>{t('conceptGarbageTitle')}</strong>: {t('conceptGarbageDesc')}
              <span className="block text-sm text-gray-500 mt-1">{t('conceptGarbageCriteria')}</span>
            </li>
            <li>
              <strong>{t('conceptHeapTitle')}</strong>: {t('conceptHeapDesc')}
            </li>
            <li>
              <strong>{t('conceptGCTitle')}</strong>: {t('conceptGCDesc')}
            </li>
            <li>
              <strong>{t('conceptReachabilityTitle')}</strong>:
              <ul className="list-circle pl-5 mt-1 text-sm text-gray-600">
                <li>{t('conceptReachabilityReachable')}</li>
                <li>{t('conceptReachabilityUnreachable')}</li>
              </ul>
            </li>
          </ul>

          <h3>{t('phasesTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-900">{t('phase1Title')}</h4>
              <p className="text-sm text-green-800 mt-1">{t('phase1Desc')}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-900">{t('phase2Title')}</h4>
              <p className="text-sm text-blue-800 mt-1">{t('phase2Desc')}</p>
            </div>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
           <Link href={`/${locale}`} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl inline-block">
             {t('enterHeap')}
           </Link>
        </div>
      </div>
    </div>
  );
}
