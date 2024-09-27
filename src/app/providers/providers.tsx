import { FC, ReactNode, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ChakraProvider } from "@chakra-ui/react";
import { Fallback } from "@/shared/ui/fallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/app/appStore.ts";

interface IProviders {
  readonly children: ReactNode;
}

export const Providers: FC<IProviders> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </BrowserRouter>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};
