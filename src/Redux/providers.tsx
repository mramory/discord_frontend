"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthGuard from "@/guards/AuthGuard";
import IsOnlineProvider from "@/providers/IsOnlineProvider";
import { SettingsContextComponent } from "@/context/SettingsContext";

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
