// in app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    // Le SessionProvider englobe tout
    <SessionProvider>
      {/* Le ThemeProvider vient ensuite */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange={false}
        storageKey="inomax-theme"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}