import { Api } from '@geo/curator-utils';
import { Effect, Schema } from 'effect';
import { describe, expect, it } from 'vitest';

describe('ProfileSkillsResponse schema', () => {
  it('decodes empty skills array', async () => {
    const decode = Schema.decodeUnknown(Api.ProfileSkillsResponse);
    const value = await Effect.runPromise(decode({ skills: [] }));
    expect(value).toEqual({ skills: [] });
  });

  it('decodes valid skills', async () => {
    const decode = Schema.decodeUnknown(Api.ProfileSkillsResponse);
    const value = await Effect.runPromise(decode({ skills: [{ id: '1', name: 'Solidity' }] }));
    expect(value.skills[0]).toEqual({ id: '1', name: 'Solidity' });
  });

  it('fails when id is missing', async () => {
    const decode = Schema.decodeUnknown(Api.ProfileSkillsResponse);
    await expect(Effect.runPromise(decode({ skills: [{ name: 'Solidity' }] }))).rejects.toThrow();
  });

  it('fails when id has wrong type', async () => {
    const decode = Schema.decodeUnknown(Api.ProfileSkillsResponse);
    await expect(
      Effect.runPromise(decode({ skills: [{ id: 1 as unknown as string, name: 'Solidity' }] })),
    ).rejects.toThrow();
  });
});
