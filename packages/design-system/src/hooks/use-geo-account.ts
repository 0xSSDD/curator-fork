import { Graph } from '@graphprotocol/grc-20';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { createAccountSpace } from '../utils/create-account-space.js';
import { fetchGeoProfile } from '../utils/fetch-geo-profile.js';

export type OnboardingStep = 'edit-profile' | 'create-account-space' | 'complete';
export type GeoAccountState =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | {
      status: 'signed-in';
      onboardingStep: OnboardingStep;
      createAccount: (props: {
        name: string;
        githubUrl: string;
        xUrl: string;
        linkedinUrl: string;
      }) => Promise<{ accountId: string; spaceId: string; spaceEntityId: string } | null>;
      profile: { name: string } | null | undefined;
    };

export const useGeoAccount = (): GeoAccountState => {
  const { authenticated: privyAuthenticated, ready: privyReady } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();
  const [isCreatingAccountSpace, setIsCreatingAccountSpace] = useState(false);
  const queryClient = useQueryClient();

  const createAccount = useCallback(
    async ({
      name,
      githubUrl,
      xUrl,
      linkedinUrl,
    }: {
      name: string;
      githubUrl: string;
      xUrl: string;
      linkedinUrl: string;
    }) => {
      setIsCreatingAccountSpace(true);
      try {
        if (!walletsReady) return null;
        const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy') || wallets[0];
        if (!embeddedWallet?.address) return null;

        const { accountId, spaceId, spaceEntityId } = await createAccountSpace({
          accountAddress: embeddedWallet.address,
          name,
          githubUrl,
          xUrl,
          linkedinUrl,
        });
        queryClient.invalidateQueries({ queryKey: ['current-user-profile'] });
        setIsCreatingAccountSpace(false);
        return {
          accountId,
          spaceId,
          spaceEntityId,
        };
      } catch (error) {
        console.error(error);
        setIsCreatingAccountSpace(false);
        return null;
      }
    },
    [walletsReady, wallets, queryClient],
  );

  const { data: profile, isFetched } = useQuery({
    enabled: walletsReady,
    queryKey: ['current-user-profile'],
    queryFn: async () => {
      if (!walletsReady) return null;
      const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy') || wallets[0];
      if (!embeddedWallet?.address) return null;

      const result = await fetchGeoProfile({
        accountAddress: embeddedWallet.address,
        url: `${Graph.TESTNET_API_ORIGIN}/graphql`,
      });
      if (!result) return null;
      return result;
    },
  });

  if (privyReady && !privyAuthenticated) {
    return { status: 'signed-out' };
  }

  if (!privyReady || !isFetched) {
    return { status: 'loading' };
  }

  let step: OnboardingStep = 'edit-profile';
  if (isCreatingAccountSpace) {
    step = 'create-account-space';
  }
  if (profile) {
    step = 'complete';
  }

  return {
    status: 'signed-in',
    onboardingStep: step,
    createAccount,
    profile,
  };
};
