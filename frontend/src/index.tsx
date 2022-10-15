import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createClient, WagmiConfig} from 'wagmi'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import LandingPage from './pages/landing'
import UserProfilePage from './pages/user-profile'
import MintPage from 'pages/mint';
import TransferPage from 'pages/transfer';

const client = createClient(getDefaultClient({ appName: 'Sell Your Soul Wallet' }))

const container = document.getElementById('root')!
const root = ReactDOM.createRoot(container)

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: "/mint", element: <MintPage /> },
  { path: "/transfer", element: <TransferPage /> },
  { path: '/users/:address', element: <UserProfilePage /> },

])


root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
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
