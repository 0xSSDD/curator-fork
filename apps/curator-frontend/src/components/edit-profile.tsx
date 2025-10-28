import { AvatarUpload } from '@geo/design-system';
import type { Id, Op } from '@graphprotocol/grc-20';
import { useState } from 'react';
import { network } from '@/config';
import { SkillsField } from './skills-field';

export const EditProfile = ({
  onSubmit,
}: {
  onSubmit: ({
    name,
    githubUrl,
    xUrl,
    linkedinUrl,
    avatarData,
  }: {
    name: string;
    githubUrl: string;
    xUrl: string;
    linkedinUrl: string;
    avatarData: { id: Id; ops: Op[]; cid: string } | undefined;
  }) => void;
}) => {
  const [avatarData, setAvatarData] = useState<{ id: Id; ops: Op[]; cid: string } | undefined>(undefined);

  return (
    <div>
      <p>Fill out your profile</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const name = formData.get('name') as string;
          const githubUrl = formData.get('githubUrl') as string;
          const xUrl = formData.get('xUrl') as string;
          const linkedinUrl = formData.get('linkedinUrl') as string;
          if (!name) {
            return;
          }
          onSubmit({ name, githubUrl, xUrl, linkedinUrl, avatarData });
        }}
      >
        <AvatarUpload network={network} onUpload={(newAvatarData) => setAvatarData(newAvatarData)} />
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="xUrl" placeholder="X URL" />
        <input type="text" name="linkedinUrl" placeholder="LinkedIn URL" />
        <input type="text" name="githubUrl" placeholder="GitHub URL" />
        <SkillsField />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};
