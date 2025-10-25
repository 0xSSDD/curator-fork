import { ContentIds, SystemIds } from '@graphprotocol/grc-20';
import { Entity, Id, Type } from '@graphprotocol/hypergraph';

export const Skill = Entity.Schema(
  {
    name: Type.String,
  },
  {
    types: [ContentIds.SKILL_TYPE],
    properties: {
      name: Id(SystemIds.NAME_PROPERTY),
    },
  },
);

export type Skill = Entity.Entity<typeof Skill>;
