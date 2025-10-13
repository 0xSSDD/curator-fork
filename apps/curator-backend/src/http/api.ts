import { HttpApi, HttpApiEndpoint, HttpApiGroup } from '@effect/platform';
import { Schema } from 'effect';

/**
 * Health endpoints
 */
export const statusEndpoint = HttpApiEndpoint.get('status')`/status`.addSuccess(Schema.String);

export const healthGroup = HttpApiGroup.make('Health').add(statusEndpoint);

/**
 * Main API definition
 */
export const curatorApi = HttpApi.make('CuratorApi').add(healthGroup);
