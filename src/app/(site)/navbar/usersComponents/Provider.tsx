// Provider.tsx
'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
  session?: Session | null;
}

const Provider: FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
