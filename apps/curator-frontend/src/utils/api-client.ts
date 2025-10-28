import { HttpApiClient } from '@effect/platform';
import { Api } from '@geo/curator-utils';

export const ApiClient = HttpApiClient.make(Api.curatorApi, {
  baseUrl: import.meta.env.VITE_CURATOR_API_URL,
});
