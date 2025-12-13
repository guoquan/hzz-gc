"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to default locale
    router.replace('/zh');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen text-sm text-gray-500 font-mono">
      Redirecting to HZZ-GC...
    </div>
  );
}
