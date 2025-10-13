import { PrivyClient, type Wallet } from '@privy-io/server-auth';
import { Config, Context, Effect, Layer } from 'effect';
import { AuthenticationError, PrivyConfigError, PrivyTokenError } from '../http/errors.js';
import * as DatabaseService from './database.js';

export class PrivyAuthService extends Context.Tag('PrivyAuthService')<
  PrivyAuthService,
  {
    readonly verifyPrivyToken: (idToken: string) => Effect.Effect<string, PrivyTokenError | PrivyConfigError>;
    readonly authenticateRequest: (
      idToken: string | undefined,
    ) => Effect.Effect<void, AuthenticationError | PrivyConfigError | PrivyTokenError>;
  }
>() {}

export const layer = Effect.gen(function* () {
  const privyAppId = yield* Config.string('PRIVY_APP_ID').pipe(Config.orElse(() => Config.succeed('')));
  const privyAppSecret = yield* Config.string('PRIVY_APP_SECRET').pipe(Config.orElse(() => Config.succeed('')));

  const verifyPrivyToken = Effect.fn('verifyPrivyToken')(function* (idToken: string) {
    if (!privyAppId || !privyAppSecret) {
      return yield* new PrivyConfigError({ message: 'Missing Privy configuration' });
    }

    const privy = new PrivyClient(privyAppId, privyAppSecret);

    const user = yield* Effect.tryPromise({
      try: () => privy.getUser({ idToken }),
      catch: (error) =>
        new PrivyTokenError({
          message: `Invalid Privy token: ${error}`,
        }),
    });

    if (!user) {
      return yield* new PrivyTokenError({ message: 'Invalid Privy user' });
    }

    const wallet = user.linkedAccounts.find(
      (account) => account.type === 'wallet' && account.walletClientType === 'privy',
    ) as Wallet | undefined;

    if (!wallet) {
      return yield* new PrivyTokenError({ message: 'No Privy wallet found' });
    }

    return wallet.address;
  });

  const authenticateRequest = Effect.fn('authenticateRequest')(function* (idToken: string | undefined) {
    if (!idToken) {
      return yield* new AuthenticationError({ message: 'No Privy ID token provided' });
    }

    const signerAddress = yield* verifyPrivyToken(idToken);
    if (!signerAddress) {
      return yield* new AuthenticationError({ message: 'Invalid Privy token' });
    }
  });

  return {
    verifyPrivyToken,
    authenticateRequest,
  };
}).pipe(Layer.effect(PrivyAuthService), Layer.provide(DatabaseService.layer));
