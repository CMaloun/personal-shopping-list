/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecipeIdentification = /* GraphQL */ `
  query GetRecipeIdentification($id: ID!) {
    getRecipeIdentification(id: $id) {
      id
      s3Key
      title
      imageUri
      FileSystemPath
      description
      createdAt
      updatedAt
    }
  }
`;
export const listRecipeIdentifications = /* GraphQL */ `
  query ListRecipeIdentifications(
    $filter: ModelRecipeIdentificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipeIdentifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        s3Key
        title
        imageUri
        FileSystemPath
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
