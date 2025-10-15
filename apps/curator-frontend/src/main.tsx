import { HypergraphAppProvider } from '@graphprotocol/hypergraph-react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import './index.css';

import { PrivyProvider } from '@privy-io/react-auth';
// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'google'],
        appearance: {
          theme: 'light',
          accentColor: '#6833ff',
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      <HypergraphAppProvider appId="93bb8907-085a-4a0e-83dd-62b0dc98e793">
        <RouterProvider router={router} />
      </HypergraphAppProvider>
      ,
    </PrivyProvider>,
    // </React.StrictMode>,
  );
}
