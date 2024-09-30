import { persistor, store } from "@/app/appStore.ts";
import { Fallback } from "@/shared/ui/fallback";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type FC, type ReactNode, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

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
