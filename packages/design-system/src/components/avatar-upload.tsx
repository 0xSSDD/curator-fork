import { Graph, type Id, type Op } from '@graphprotocol/grc-20';
import { useId, useState } from 'react';
import type { Network } from '../types.js';
import { IpfsImage } from './ipfs-image.js';

type AvatarUploadProps = {
  onUpload: ({ id, ops, cid }: { id: Id; ops: Op[]; cid: string }) => void;
  network: Network;
};

export const AvatarUpload = ({ onUpload, network }: AvatarUploadProps) => {
  const avatarInputId = useId();
  const [avatarCid, setAvatarCid] = useState<string | undefined>(undefined);

  const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const { id, ops, cid } = await Graph.createImage({
          blob: file,
          name: 'Avatar',
          network,
        });

        setAvatarCid(cid);
        onUpload({ id, ops, cid });
      }
    } catch (_error) {
      // TODO: replace alert with a toast notification once we have a design for it
      alert('Failed to upload avatar');
    }
  };

  return (
    <div className="flex items-center justify-center gap-1.5 pb-4">
      <label htmlFor={avatarInputId} className="inline-block cursor-pointer text-center hover:underline">
        Upload Avatar
      </label>
      {avatarCid && <IpfsImage cid={avatarCid} className="w-10 h-10 rounded-md" />}
      <input
        accept="image/png, image/jpeg"
        id={avatarInputId}
        onChange={handleUploadAvatar}
        type="file"
        className="hidden"
      />
    </div>
  );
};
