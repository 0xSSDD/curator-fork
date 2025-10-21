import type { Network } from '@geo/design-system';

const getNetwork = (): Network => {
  if (import.meta.env.VITE_KNOWLEDGE_GRAPH_NETWORK === 'TESTNET') {
    return 'TESTNET';
  }
  if (import.meta.env.VITE_KNOWLEDGE_GRAPH_NETWORK === 'MAINNET') {
    return 'MAINNET';
  }
  throw new Error(`Invalid network: ${import.meta.env.VITE_KNOWLEDGE_GRAPH_NETWORK}`);
};

export const network = getNetwork();
