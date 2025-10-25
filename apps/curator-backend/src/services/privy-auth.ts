import { Errors } from '@geo/curator-utils';
import { PrivyClient, type Wallet } from '@privy-io/server-auth';
import { Config, Context, Effect, Layer } from 'effect';
import * as DatabaseService from './database.js';

export class PrivyAuthService extends Context.Tag('PrivyAuthService')<
  PrivyAuthService,
  {
    readonly verifyPrivyToken: (
      idToken: string,
    ) => Effect.Effect<string, Errors.PrivyTokenError | Errors.PrivyConfigError>;
    readonly authenticateRequest: (
      idToken: string | undefined,
    ) => Effect.Effect<void, Errors.AuthenticationError | Errors.PrivyConfigError | Errors.PrivyTokenError>;
  }
>() {}

export const layer = Effect.gen(function* () {
  const privyAppId = yield* Config.string('PRIVY_APP_ID').pipe(Config.orElse(() => Config.succeed('')));
  const privyAppSecret = yield* Config.string('PRIVY_APP_SECRET').pipe(Config.orElse(() => Config.succeed('')));

  const verifyPrivyToken = Effect.fn('verifyPrivyToken')(function* (idToken: string) {
    if (!privyAppId || !privyAppSecret) {
      return yield* new Errors.PrivyConfigError({ message: 'Missing Privy configuration' });
    }

    const privy = new PrivyClient(privyAppId, privyAppSecret);

    const user = yield* Effect.tryPromise({
      try: () => privy.getUser({ idToken }),
      catch: (error) =>
        new Errors.PrivyTokenError({
          message: `Invalid Privy token: ${error}`,
        }),
    });

    if (!user) {
      return yield* new Errors.PrivyTokenError({ message: 'Invalid Privy user' });
    }

    const wallet = user.linkedAccounts.find(
      (account) => account.type === 'wallet' && account.walletClientType === 'privy',
    ) as Wallet | undefined;

    if (!wallet) {
      return yield* new Errors.PrivyTokenError({ message: 'No Privy wallet found' });
    }

    return wallet.address;
  });

  const authenticateRequest = Effect.fn('authenticateRequest')(function* (idToken: string | undefined) {
    if (!idToken) {
      return yield* new Errors.AuthenticationError({ message: 'No Privy ID token provided' });
    }

    const signerAddress = yield* verifyPrivyToken(idToken);
    if (!signerAddress) {
      return yield* new Errors.AuthenticationError({ message: 'Invalid Privy token' });
    }
  });

  return {
    verifyPrivyToken,
    authenticateRequest,
  };
}).pipe(Layer.effect(PrivyAuthService), Layer.provide(DatabaseService.layer));
