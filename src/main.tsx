import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import { baseSepolia } from "viem/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "@coinbase/onchainkit/styles.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <OnchainKitProvider
        chain={baseSepolia}
        apiKey="Mpvo9ZhDVRL9PeM0rYK27NTxWh7CeJXu"
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </OnchainKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
