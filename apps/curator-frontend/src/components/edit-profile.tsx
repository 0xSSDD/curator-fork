import { FetchHttpClient } from '@effect/platform';
import { Ids } from '@geo/curator-utils';
import { AvatarUpload, Button, Divider, Field, Input, Textarea } from '@geo/design-system';
import { ContentIds, type Id, type Op } from '@graphprotocol/grc-20';
import { Effect } from 'effect';
import { useState } from 'react';
import { EntityInput, type EntityItem } from '@/components/entity-input';
import { network } from '@/config';
import { ApiClient } from '../utils/api-client';

const querySkills = async (query: string) => {
  const getSkills = Effect.gen(function* () {
    const apiClient = yield* ApiClient;
    const skills = yield* apiClient.Profile.getProfileSkills({ urlParams: { query } });
    return skills;
  }).pipe(Effect.provide(FetchHttpClient.layer));
  const result = await Effect.runPromise(getSkills);
  return result.skills;
};

const queryCompanies = async (query: string) => {
  const getCompanies = Effect.gen(function* () {
    const apiClient = yield* ApiClient;
    const companies = yield* apiClient.Profile.getProfileCompanies({ urlParams: { query } });
    return companies;
  }).pipe(Effect.provide(FetchHttpClient.layer));
  const result = await Effect.runPromise(getCompanies);
  return result.companies;
};

export const EditProfile = ({
  onSubmit,
}: {
  onSubmit: ({
    name,
    githubUrl,
    xUrl,
    linkedinUrl,
    avatarData,
    worksAt,
    skills,
  }: {
    name: string;
    githubUrl: string;
    xUrl: string;
    linkedinUrl: string;
    avatarData: { id: Id; ops: Op[]; cid: string } | undefined;
    worksAt: EntityItem[];
    skills: EntityItem[];
  }) => void;
}) => {
  const [name, setName] = useState<string>('');
  const [avatarData, setAvatarData] = useState<{ id: Id; ops: Op[]; cid: string } | undefined>(undefined);
  const [worksAt, setWorksAt] = useState<EntityItem[]>([]);
  const [skills, setSkills] = useState<EntityItem[]>([]);

  return (
    <article className="mt-12">
      <h3 className="pb-10">Fill out your profile</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const githubUrl = formData.get('githubUrl') as string;
          const xUrl = formData.get('xUrl') as string;
          const linkedinUrl = formData.get('linkedinUrl') as string;
          if (!name.trim()) {
            return;
          }
          onSubmit({ name: name.trim(), githubUrl, xUrl, linkedinUrl, avatarData, worksAt, skills });
        }}
      >
        <AvatarUpload network={network} onUpload={(newAvatarData) => setAvatarData(newAvatarData)} />
        <div className="flex flex-row gap-4 items-center mb-3">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            className="text-[46px]/[44px] tracking-[-1px] md:text-[46px]/[44px] md:tracking-[-1px] font-semibold"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="text-grey-light-text">Required</div>
        </div>

        <Textarea name="description" placeholder="Describe what you do…" className="mb-10" />

        <div className="flex flex-col gap-4">
          <Divider />
          <Field.Root>
            <Field.Label>Works at</Field.Label>
            <EntityInput
              queryEntities={queryCompanies}
              onChange={(selectedCompanies) => {
                setWorksAt(selectedCompanies);
              }}
              typeIds={[Ids.COMPANY_TYPE_ID]}
            />
          </Field.Root>
          <Divider />
          <Field.Root>
            <Field.Label>Skills</Field.Label>
            <EntityInput
              queryEntities={querySkills}
              onChange={(selectedSkills) => {
                setSkills(selectedSkills);
              }}
              typeIds={[ContentIds.SKILL_TYPE]}
            />
          </Field.Root>
          <Divider />
          <Field.Root>
            <Field.Label>X</Field.Label>
            <Input type="text" name="xUrl" placeholder="URL …" />
          </Field.Root>
          <Divider />
          <Field.Root>
            <Field.Label>LinkedIn</Field.Label>
            <Input type="text" name="linkedinUrl" placeholder="URL …" />
          </Field.Root>
          <Divider />
          <Field.Root>
            <Field.Label>GitHub</Field.Label>
            <Input type="text" name="githubUrl" placeholder="URL …" />
          </Field.Root>
          <Divider />
        </div>
        <div className="flex justify-end mt-5 mb-16">
          <Button type="submit" disabled={!name.trim()}>
            Publish
          </Button>
        </div>
      </form>
    </article>
  );
};
