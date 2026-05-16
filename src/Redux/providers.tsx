"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { SettingsContextComponent } from "@/context/SettingsContext";
import AuthGuard from "@/guards/AuthGuard";
import IsOnlineProvider from "@/providers/IsOnlineProvider";
import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <AuthGuard>
          <IsOnlineProvider>
            <SettingsContextComponent>{children}</SettingsContextComponent>
          </IsOnlineProvider>
        </AuthGuard>
      </Provider>
    </QueryClientProvider>
  );
}
