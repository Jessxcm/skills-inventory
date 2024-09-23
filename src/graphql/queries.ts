/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAllUsers = /* GraphQL */ `
  query GetAllUsers {
    getAllUsers {
      pk
      sk
      gsi1pk
      gsi1sk
      firstName
      lastName
      email
      identificationType
      identification
      country
      cellphoneNumber
      phoneNumber
      city
      birthDate
      address
      profile
      image
      status
      creationDate
      modificationDate
      lastLoginDate
      lastUse
      isDeleted
      isAdmin
    }
  }
`;
export const getAllLanguages = /* GraphQL */ `
  query GetAllLanguages {
    getAllLanguages {
      pk
      sk
      gsi1pk
      gsi1sk
      nameLanguage
      level
      reading
      writting
      listening
      speaking
      creationDate
      updateDate
      observations
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser {
    getUser {
      pk
      sk
      gsi1pk
      gsi1sk
      firstName
      lastName
      email
      identificationType
      identification
      country
      cellphoneNumber
      phoneNumber
      city
      birthDate
      address
      profile
      image
      status
      creationDate
      modificationDate
      lastLoginDate
      lastUse
      isDeleted
      isAdmin
    }
  }
`;
export const getSkill = /* GraphQL */ `
  query GetSkill {
    getSkill {
      pk
      sk
      gsi1pk
      gsi1sk
      nameSkill
      description
      level
      experience
      code
      typeSkill
    }
  }
`;
export const getAllSkill = /* GraphQL */ `
  query GetAllSkill {
    getAllSkill {
      pk
      sk
      gsi1pk
      gsi1sk
      nameSkill
      description
      level
      experience
      code
      typeSkill
    }
  }
`;
export const getAllProjects = /* GraphQL */ `
  query GetAllProjects {
    getAllProjects {
      pk
      sk
      gsi1pk
      gsi1sk
      type
      client
      nameProject
      abbreviation
      code
      details
      startDate
      estimatedDate
      endDate
      observations
      status
      createdAt
      updatedAt
      tecnologies_mobile
      tecnologies_frontend
      tecnologies_backend
      tecnologies_cloud
      tecnologies_automatization
      tecnologies_database
      tecnologies_testing
    }
  }
`;
export const getProjectByPkSk = /* GraphQL */ `
  query GetProjectByPkSk($pk: String!, $sk: String!) {
    getProjectByPkSk(pk: $pk, sk: $sk) {
      pk
      sk
      gsi1pk
      gsi1sk
      type
      client
      nameProject
      abbreviation
      code
      details
      startDate
      estimatedDate
      endDate
      observations
      status
      createdAt
      updatedAt
      tecnologies_mobile
      tecnologies_frontend
      tecnologies_backend
      tecnologies_cloud
      tecnologies_automatization
      tecnologies_database
      tecnologies_testing
    }
  }
`;
export const getProjectsByClient = /* GraphQL */ `
  query GetProjectsByClient($gsi1pk: String!, $valueToSearch: String!) {
    getProjectsByClient(gsi1pk: $gsi1pk, valueToSearch: $valueToSearch) {
      pk
      sk
      gsi1pk
      gsi1sk
      type
      client
      nameProject
      abbreviation
      code
      details
      startDate
      estimatedDate
      endDate
      observations
      status
      createdAt
      updatedAt
      tecnologies_mobile
      tecnologies_frontend
      tecnologies_backend
      tecnologies_cloud
      tecnologies_automatization
      tecnologies_database
      tecnologies_testing
    }
  }
`;
export const getLanguageByGSI1PK = /* GraphQL */ `
  query GetLanguageByGSI1PK($gsi1pk: String!) {
    getLanguageByGSI1PK(gsi1pk: $gsi1pk) {
      pk
      sk
      gsi1pk
      gsi1sk
      nameLanguage
      level
      reading
      writting
      listening
      speaking
      creationDate
      updateDate
      observations
    }
  }
`;
export const getSkillsinventoryDevRegistrydbMainDB = /* GraphQL */ `
  query GetSkillsinventoryDevRegistrydbMainDB($pk: String!, $sk: String!) {
    getSkillsinventoryDevRegistrydbMainDB(pk: $pk, sk: $sk) {
      pk
      sk
      email
      gsi1pk
      gsi1sk
    }
  }
`;
export const listSkillsinventoryDevRegistrydbMainDBS = /* GraphQL */ `
  query ListSkillsinventoryDevRegistrydbMainDBS(
    $filter: TableSkillsinventoryDevRegistrydbMainDBFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSkillsinventoryDevRegistrydbMainDBS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        pk
        sk
        email
        gsi1pk
        gsi1sk
      }
      nextToken
    }
  }
`;
export const querySkillsinventoryDevRegistrydbMainDBSByGsi1pkGsi1skIndex = /* GraphQL */ `
  query QuerySkillsinventoryDevRegistrydbMainDBSByGsi1pkGsi1skIndex(
    $gsi1pk: String!
    $first: Int
    $after: String
  ) {
    querySkillsinventoryDevRegistrydbMainDBSByGsi1pkGsi1skIndex(
      gsi1pk: $gsi1pk
      first: $first
      after: $after
    ) {
      items {
        pk
        sk
        email
        gsi1pk
        gsi1sk
      }
      nextToken
    }
  }
`;
export const querySkillsinventoryDevRegistrydbMainDBSByEmailIndex = /* GraphQL */ `
  query QuerySkillsinventoryDevRegistrydbMainDBSByEmailIndex(
    $email: String!
    $first: Int
    $after: String
  ) {
    querySkillsinventoryDevRegistrydbMainDBSByEmailIndex(
      email: $email
      first: $first
      after: $after
    ) {
      items {
        pk
        sk
        email
        gsi1pk
        gsi1sk
      }
      nextToken
    }
  }
`;
