import { gql, request } from 'graphql-request';

const profileQueryDocument = gql`
  query profile($accountAddress: String!) {
  spaces(
    filter: {and: [
      {editors: {every: {address: {is: $accountAddress}}}},
      {relationsConnection: {some: {toEntity: {values: {some: {propertyId: {is: "85cebdf1-d84f-4afd-993b-35f182096b59"}, string: {is: $accountAddress}}}}}}}]}
  ) {
    page {
      name
    }
  }
}
`;

type ProfileQueryResult = {
  spaces: {
    page: {
      name: string;
    };
  }[];
};

type UseProfileParams = {
  accountAddress: string;
  url: string;
};

export const fetchGeoProfile = async ({ accountAddress, url }: UseProfileParams) => {
  const result = await request<ProfileQueryResult>(url, profileQueryDocument, {
    accountAddress,
  });
  if (result.spaces.length === 0) {
    return undefined;
  }
  return { name: result.spaces[0].page.name };
};
