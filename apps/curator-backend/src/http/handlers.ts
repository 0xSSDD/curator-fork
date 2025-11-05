import { HttpApiBuilder } from '@effect/platform';
import { Api } from '@geo/curator-utils';
import { Effect, Layer } from 'effect';
import * as KnowledgeGraphProfileService from '../services/knowledge-graph-profile.js';

/**
 * Health Group Handlers
 */
const HealthGroupLive = HttpApiBuilder.group(Api.curatorApi, 'Health', (handlers) => {
  return handlers.handle('status', () => Effect.succeed('OK'));
});

/**
 * Profile Group Handlers
 */
const ProfileGroupLive = HttpApiBuilder.group(Api.curatorApi, 'Profile', (handlers) => {
  return handlers
    .handle(
      'getProfileSkills',
      Effect.fn('getProfileSkills')(function* ({ urlParams }: { urlParams: { query: string } }) {
        const knowledgeGraphProfileService = yield* KnowledgeGraphProfileService.KnowledgeGraphProfileService;

        const skills = yield* knowledgeGraphProfileService.findSkills(urlParams.query);
        return { skills };
      }),
    )
    .handle(
      'getProfileCompanies',
      Effect.fn('getProfileCompanies')(function* ({ urlParams }: { urlParams: { query: string } }) {
        const knowledgeGraphProfileService = yield* KnowledgeGraphProfileService.KnowledgeGraphProfileService;

        const companies = yield* knowledgeGraphProfileService.findCompanies(urlParams.query);
        return { companies };
      }),
    );
});

/**
 * All handlers combined
 */
export const HandlersLive = Layer.mergeAll(HealthGroupLive, ProfileGroupLive);
