import { FetchHttpClient } from '@effect/platform';
import { useQuery } from '@tanstack/react-query';
import { Effect } from 'effect';
import { useId, useState } from 'react';
import { ApiClient } from '../utils/api-client';

export const SkillsField = () => {
  const [query, setQuery] = useState<string>('Technical');
  const queryId = useId();
  const { data: skills, isLoading } = useQuery({
    enabled: query.length > 0,
    queryKey: ['skills', query],
    queryFn: async () => {
      const getSkills = Effect.gen(function* () {
        const apiClient = yield* ApiClient;
        const skills = yield* apiClient.Profile.getProfileSkills({ urlParams: { query } });
        return skills;
      }).pipe(Effect.provide(FetchHttpClient.layer));

      const result = await Effect.runPromise(getSkills);
      return result.skills;
    },
  });

  return (
    <div>
      <label htmlFor={queryId}>Search for skills</label>
      <input
        id={queryId}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      />

      <ul>
        {skills?.map((skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
