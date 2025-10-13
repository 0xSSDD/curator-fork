import { Config, Effect } from 'effect';

/**
 * Server configuration
 */
export const serverPortConfig = Config.number('PORT').pipe(Config.withDefault(3030));

/**
 * Load all server configuration
 */
export const serverConfig = Effect.all({
  port: serverPortConfig,
});
