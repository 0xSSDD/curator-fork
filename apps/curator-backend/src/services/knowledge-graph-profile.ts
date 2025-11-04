import { Domain, Errors } from '@geo/curator-utils';
import { Entity } from '@graphprotocol/hypergraph';
import { Context, Effect, Layer } from 'effect';
import { CRYPTO_SPACE_ID } from '../constants.js';

export class KnowledgeGraphProfileService extends Context.Tag('KnowledgeGraphProfileService')<
  KnowledgeGraphProfileService,
  {
    readonly findSkills: (query: string) => Effect.Effect<Domain.Skill[], Errors.KnowledgeGraphQueryError>;
    readonly findCompanies: (query: string) => Effect.Effect<Domain.Company[], Errors.KnowledgeGraphQueryError>;
  }
>() {}

export const layer = Effect.gen(function* () {
  const findSkills = Effect.fn('findSkills')(function* (query: string) {
    const response = yield* Effect.tryPromise({
      try: () =>
        Entity.searchManyPublic(Domain.Skill, {
          query,
          space: CRYPTO_SPACE_ID,
        }),
      catch: (cause) => {
        if (cause instanceof Error) {
          return new Errors.KnowledgeGraphQueryError({ message: cause.message });
        }
        return new Errors.KnowledgeGraphQueryError({ message: 'Failed to query knowledge graph' });
      },
    });
    return response.data;
  });

  const findCompanies = Effect.fn('findCompanies')(function* (query: string) {
    const response = yield* Effect.tryPromise({
      try: () =>
        Entity.searchManyPublic(Domain.Company, {
          query,
          space: CRYPTO_SPACE_ID,
        }),
      catch: (cause) => {
        if (cause instanceof Error) {
          return new Errors.KnowledgeGraphQueryError({ message: cause.message });
        }
        return new Errors.KnowledgeGraphQueryError({ message: 'Failed to query knowledge graph' });
      },
    });
    return response.data;
  });

  return {
    findSkills,
    findCompanies,
  } as const;
}).pipe(Layer.effect(KnowledgeGraphProfileService));
