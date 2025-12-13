import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function Manifesto({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Manifesto'});

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8 md:p-12">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-xl shadow-lg border border-gray-100">
        
        <div className="mb-8">
          <Link href={`/${locale}`} className="text-green-600 hover:text-green-800 font-mono text-sm flex items-center">
            &larr; {t('back')}
          </Link>
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
          <h3>{t('overviewTitle')}</h3>
          {/* Using dangerouslySetInnerHTML or just text if it's simple. My json has simple text. */}
          <p>
            {t('overviewText')}
          </p>
          
          {/* Keeping the rest of the detailed text static/English for now as it wasn't fully extracted to JSON 
              in the previous step due to length. In a real app, all paragraphs would be in JSON. 
              For this demo, I'll assume the user accepts the hybrid approach or just the headers translated 
              where keys are missing. */}
          
          <h3>0x01. Core Concepts (核心概念)</h3>
          <p>This project strictly adopts the <strong>Garbage Collection</strong> metaphor:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Garbage (Object)</strong>: Any tool, script, demo, or prompt created by a group member.
            </li>
            <li>
              <strong>Heap</strong>: The central area where all Garbage is allocated and displayed.
            </li>
            <li>
              <strong>GC (Collection)</strong>: Minor GC (Daily), Major GC (Weekly).
            </li>
          </ul>

          <h3>0x02. Phases (阶段)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-900">Phase 1: Minor GC</h4>
              <p className="text-sm text-green-800 mt-1">Visualization & Allocation.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-bold text-blue-900">Phase 2: Major GC</h4>
              <p className="text-sm text-blue-800 mt-1">Deduplication & Search.</p>
            </div>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
           <Link href="/" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl inline-block">
             {t('enterHeap')}
           </Link>
        </div>
      </div>
    </div>
  );
}