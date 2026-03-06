// app/providers.tsx
"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

export default function Providers({ children }: PropsWithChildren) { // Changed to default export
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// History update: 2026-03-07T23:00:28

// Dev session update: 2026-03-07T01:39:32
