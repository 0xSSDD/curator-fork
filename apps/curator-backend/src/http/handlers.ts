import { HttpApiBuilder } from '@effect/platform';
import { Effect, Layer } from 'effect';
import * as Api from './api.js';

/**
 * Health Group Handlers
 */
const HealthGroupLive = HttpApiBuilder.group(Api.curatorApi, 'Health', (handlers) => {
  return handlers.handle('status', () => Effect.succeed('OK'));
});

/**
 * All handlers combined
 */
export const HandlersLive = Layer.mergeAll(HealthGroupLive);
