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

export const Company = Entity.Schema(
  {
    name: Type.String,
  },
  {
    types: [Id('e059a29e-6f6b-437b-bc15-c7983d078c0d')], // Company type ID from knowledge graph
    properties: {
      name: Id(SystemIds.NAME_PROPERTY),
    },
  },
);

export type Company = Entity.Entity<typeof Company>;
