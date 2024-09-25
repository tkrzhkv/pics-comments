import { FC, ReactNode, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ChakraProvider } from "@chakra-ui/react";
import { Fallback } from "@/shared/ui/fallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

interface IProviders {
  readonly children: ReactNode;
}

export const Providers: FC<IProviders> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <ChakraProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </BrowserRouter>
      </ChakraProvider>
    </ErrorBoundary>
  );
};
