import { ContentIds, SystemIds } from '@graphprotocol/grc-20';
import { Entity, Id, Type } from '@graphprotocol/hypergraph';
import { COMPANY_TYPE_ID } from './ids.js';

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
    types: [COMPANY_TYPE_ID], // Company type ID from knowledge graph
    properties: {
      name: Id(SystemIds.NAME_PROPERTY),
    },
  },
);

export type Company = Entity.Entity<typeof Company>;
