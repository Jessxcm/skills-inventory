/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateUser = /* GraphQL */ `
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($pk: String!, $sk: String!) {
    deleteUser(pk: $pk, sk: $sk) {
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
export const disableUser = /* GraphQL */ `
  mutation DisableUser($pk: String!, $sk: String!) {
    disableUser(pk: $pk, sk: $sk) {
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
export const addProject = /* GraphQL */ `
  mutation AddProject($project: AddProjectInput!) {
    addProject(project: $project) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject($project: UpdateProjectInput!) {
    updateProject(project: $project) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject($pk: String!, $sk: String!) {
    deleteProject(pk: $pk, sk: $sk) {
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
export const deleteSkill = /* GraphQL */ `
  mutation DeleteSkill($pk: String!, $sk: String!) {
    deleteSkill(pk: $pk, sk: $sk) {
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
export const addSkill = /* GraphQL */ `
  mutation AddSkill($skill: AddSkillInput!) {
    addSkill(skill: $skill) {
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
export const updateSkill = /* GraphQL */ `
  mutation UpdateSkill($user: UpdateSkillInput!) {
    updateSkill(user: $user) {
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
export const addLanguage = /* GraphQL */ `
  mutation AddLanguage($language: AddLanguageInput!) {
    addLanguage(language: $language) {
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
export const updateLanguage = /* GraphQL */ `
  mutation UpdateLanguage($language: UpdateLanguageInput!) {
    updateLanguage(language: $language) {
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
export const deleteLanguage = /* GraphQL */ `
  mutation DeleteLanguage($pk: String!, $sk: String!) {
    deleteLanguage(pk: $pk, sk: $sk) {
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
export const createSkillsinventoryDevRegistrydbMainDB = /* GraphQL */ `
  mutation CreateSkillsinventoryDevRegistrydbMainDB(
    $input: CreateSkillsinventoryDevRegistrydbMainDBInput!
  ) {
    createSkillsinventoryDevRegistrydbMainDB(input: $input) {
      pk
      sk
      email
      gsi1pk
      gsi1sk
    }
  }
`;
export const updateSkillsinventoryDevRegistrydbMainDB = /* GraphQL */ `
  mutation UpdateSkillsinventoryDevRegistrydbMainDB(
    $input: UpdateSkillsinventoryDevRegistrydbMainDBInput!
  ) {
    updateSkillsinventoryDevRegistrydbMainDB(input: $input) {
      pk
      sk
      email
      gsi1pk
      gsi1sk
    }
  }
`;
export const deleteSkillsinventoryDevRegistrydbMainDB = /* GraphQL */ `
  mutation DeleteSkillsinventoryDevRegistrydbMainDB(
    $input: DeleteSkillsinventoryDevRegistrydbMainDBInput!
  ) {
    deleteSkillsinventoryDevRegistrydbMainDB(input: $input) {
      pk
      sk
      email
      gsi1pk
      gsi1sk
    }
  }
`;
