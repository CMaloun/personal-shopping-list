/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipeIdentification = /* GraphQL */ `
  mutation CreateRecipeIdentification(
    $input: CreateRecipeIdentificationInput!
    $condition: ModelRecipeIdentificationConditionInput
  ) {
    createRecipeIdentification(input: $input, condition: $condition) {
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
export const updateRecipeIdentification = /* GraphQL */ `
  mutation UpdateRecipeIdentification(
    $input: UpdateRecipeIdentificationInput!
    $condition: ModelRecipeIdentificationConditionInput
  ) {
    updateRecipeIdentification(input: $input, condition: $condition) {
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
export const deleteRecipeIdentification = /* GraphQL */ `
  mutation DeleteRecipeIdentification(
    $input: DeleteRecipeIdentificationInput!
    $condition: ModelRecipeIdentificationConditionInput
  ) {
    deleteRecipeIdentification(input: $input, condition: $condition) {
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
