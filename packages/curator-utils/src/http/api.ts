import { HttpApi, HttpApiEndpoint, HttpApiGroup } from '@effect/platform';
import { Schema } from 'effect';
import { Company, Skill } from '../domain.js';
import * as Errors from '../errors.js';

export class ProfileSkillsResponse extends Schema.Class<ProfileSkillsResponse>('ProfileSkillsResponse')({
  // TODO: extending `Skill` with `id` should not be necessary. This is a bug in Hypergraph and once fixed the extension should be removed.
  skills: Schema.Array(Schema.extend(Skill, Schema.Struct({ id: Schema.String }))),
}) {}

export class ProfileCompaniesResponse extends Schema.Class<ProfileCompaniesResponse>('ProfileCompaniesResponse')({
  // TODO: extending `Company` with `id` should not be necessary. This is a bug in Hypergraph and once fixed the extension should be removed.
  companies: Schema.Array(Schema.extend(Company, Schema.Struct({ id: Schema.String }))),
}) {}

/**
 * Health endpoints
 */
export const statusEndpoint = HttpApiEndpoint.get('status')`/status`.addSuccess(Schema.String);

export const healthGroup = HttpApiGroup.make('Health').add(statusEndpoint);

/**
 * Profile
 */
export const getProfileSkillsEndpoint = HttpApiEndpoint.get('getProfileSkills')`/profile/skills`
  .setUrlParams(
    Schema.Struct({
      query: Schema.String,
    }),
  )
  .addSuccess(ProfileSkillsResponse)
  .addError(Errors.KnowledgeGraphQueryError, { status: 500 });

export const getProfileCompaniesEndpoint = HttpApiEndpoint.get('getProfileCompanies')`/profile/companies`
  .setUrlParams(
    Schema.Struct({
      query: Schema.String,
    }),
  )
  .addSuccess(ProfileCompaniesResponse)
  .addError(Errors.KnowledgeGraphQueryError, { status: 500 });

export const profileGroup = HttpApiGroup.make('Profile').add(getProfileSkillsEndpoint).add(getProfileCompaniesEndpoint);

/**
 * Main API definition
 */
export const curatorApi = HttpApi.make('CuratorApi').add(healthGroup).add(profileGroup);
