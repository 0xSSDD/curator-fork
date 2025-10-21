import { Account, Graph, Id, IdUtils, type Op, type PropertiesParam, SystemIds } from '@graphprotocol/grc-20';
import { GITHUB_URL_PROPERTY_ID, LINKEDIN_URL_PROPERTY_ID, X_URL_PROPERTY_ID } from './property-ids.js';

type CreateAccountSpaceParams = {
  accountAddress: string;
  name: string;
  githubUrl: string;
  xUrl: string;
  linkedinUrl: string;
};

export const createAccountSpace = async ({
  accountAddress,
  name,
  githubUrl,
  xUrl,
  linkedinUrl,
}: CreateAccountSpaceParams) => {
  const spaceEntityId = IdUtils.generate();

  const ops: Op[] = [];

  const { accountId, ops: accountOps } = Account.make(accountAddress);
  ops.push(...accountOps);

  if (githubUrl || xUrl || linkedinUrl) {
    const values: PropertiesParam = [];
    if (githubUrl) {
      values.push({
        property: Id(GITHUB_URL_PROPERTY_ID),
        value: githubUrl,
      });
    }
    if (xUrl) {
      values.push({
        property: Id(X_URL_PROPERTY_ID),
        value: xUrl,
      });
    }
    if (linkedinUrl) {
      values.push({
        property: Id(LINKEDIN_URL_PROPERTY_ID),
        value: linkedinUrl,
      });
    }
    const { ops: updateEntityOps } = Graph.updateEntity({ id: spaceEntityId, values });
    ops.push(...updateEntityOps);
  }

  const { ops: relationOps } = Graph.createRelation({
    fromEntity: spaceEntityId,
    toEntity: accountId,
    type: SystemIds.ACCOUNTS_PROPERTY,
  });
  ops.push(...relationOps);

  const { id } = await Graph.createSpace({
    editorAddress: accountAddress,
    name,
    network: 'TESTNET',
    governanceType: 'PERSONAL',
    ops,
    spaceEntityId,
  });

  return {
    accountId,
    spaceId: String(id),
    spaceEntityId,
  };
};
