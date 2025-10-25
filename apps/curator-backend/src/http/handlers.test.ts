import { HttpApiBuilder, HttpServer } from '@effect/platform';
import { describe, it } from '@effect/vitest';
import { Effect, Layer } from 'effect';
import type { Skill } from '../schema.js';
import * as KnowledgeGraphProfileService from '../services/knowledge-graph-profile.js';
import * as Api from './api.js';
import { HandlersLive } from './handlers.js';

describe('HealthGroupLive', () => {
  it.effect('status returns OK', ({ expect }) =>
    Effect.gen(function* () {
      const apiLive = HttpApiBuilder.api(Api.curatorApi).pipe(
        Layer.provide(HandlersLive),
        Layer.provide(KnowledgeGraphProfileService.layer),
      );

      const { handler, dispose } = HttpApiBuilder.toWebHandler(Layer.mergeAll(apiLive, HttpServer.layerContext));

      const response = yield* Effect.promise(() => handler(new Request('http://localhost/status')));
      const text = yield* Effect.promise(() => response.text());

      yield* Effect.sync(() => {
        expect(response.status).toBe(200);
        expect(text).toBe('"OK"');
      });

      yield* Effect.promise(() => dispose());
    }),
  );
});

describe('ProfileGroupLive', () => {
  it.effect('getProfileSkills returns empty array', ({ expect }) =>
    Effect.gen(function* () {
      const mockService = Layer.sync(KnowledgeGraphProfileService.KnowledgeGraphProfileService, () => ({
        findSkills: (_query: string) => Effect.succeed([{ id: '1', name: 'Skill 1' } as Skill]),
      }));

      const apiLive = HttpApiBuilder.api(Api.curatorApi).pipe(Layer.provide(HandlersLive), Layer.provide(mockService));

      const { handler, dispose } = HttpApiBuilder.toWebHandler(Layer.mergeAll(apiLive, HttpServer.layerContext));

      const response = yield* Effect.promise(() =>
        handler(new Request('http://localhost/profile/skills?query=Financial')),
      );
      const body = yield* Effect.promise(() => response.json());

      yield* Effect.sync(() => {
        expect(response.status).toBe(200);
        expect(body).toEqual({ skills: [{ id: '1', name: 'Skill 1' }] });
      });

      yield* Effect.promise(() => dispose());
    }),
  );
});
