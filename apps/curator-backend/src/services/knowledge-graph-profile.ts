import { Entity } from '@graphprotocol/hypergraph';
import { Context, Effect, Layer } from 'effect';
import { CRYPTO_SPACE_ID } from '../constants.js';
import { KnowledgeGraphQueryError } from '../http/errors.js';
import { Skill } from '../schema.js';

export class KnowledgeGraphProfileService extends Context.Tag('KnowledgeGraphProfileService')<
  KnowledgeGraphProfileService,
  {
    readonly findSkills: (query: string) => Effect.Effect<Skill[], KnowledgeGraphQueryError>;
  }
>() {}

export const layer = Effect.gen(function* () {
  const findSkills = Effect.fn('findSkills')(function* (query: string) {
    const response = yield* Effect.tryPromise({
      try: () =>
        Entity.searchManyPublic(Skill, {
          query,
          space: CRYPTO_SPACE_ID,
        }),
      catch: (cause) => {
        if (cause instanceof Error) {
          return new KnowledgeGraphQueryError({ message: cause.message });
        }
        return new KnowledgeGraphQueryError({ message: 'Failed to query knowledge graph' });
      },
    });
    return response.data;
  });

  return {
    findSkills,
  } as const;
}).pipe(Layer.effect(KnowledgeGraphProfileService));
