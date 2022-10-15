import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createClient, WagmiConfig, chain } from "wagmi";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./pages/landing";

const chains = [chain.arbitrumGoerli]; // chain.mainnet, chain.polygon];
const client = createClient(
  getDefaultClient({ appName: "Sell Your Soul Wallet", chains })
);

const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([{ path: "/", element: <LandingPage /> }]);

root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="retro">
        <ChakraProvider
          theme={extendTheme({
            fonts: {
              heading: `'Ubuntu', sans-serif`,
              body: `'Ubuntu', sans-serif`,
            },
          })}
        >
          <RouterProvider router={router} />
        </ChakraProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
