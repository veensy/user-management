import gql from "graphql-tag";

export default gql`
  mutation UpdateUser(
    $name: String
    $email: String
    $organizationId: String
    $teamId: String
  ) {
    updateUser(
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
