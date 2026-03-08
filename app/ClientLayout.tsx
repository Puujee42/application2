'use client';

import { SWRConfig } from 'swr';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';

const swrDefaults = {
  revalidateOnFocus: false,
  dedupingInterval: 120000,
  errorRetryCount: 2,
};

import FloatingChatButton from '@/components/FloatingChatButton';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={swrDefaults}>
      <LanguageProvider>
        <AuthProvider>
          <ErrorBoundary>
            {children}
            <FloatingChatButton />
            <Toaster position="top-right" reverseOrder={false} />
          </ErrorBoundary>
        </AuthProvider>
      </LanguageProvider>
    </SWRConfig>
  );
}
