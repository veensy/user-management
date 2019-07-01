import gql from "graphql-tag";

export default gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $email: String
    $organizationId: String
    $teamId: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      organizationId: $organizationId
      teamId: $teamId
    ) {
      id
      name
      email
    }
  }
`;
