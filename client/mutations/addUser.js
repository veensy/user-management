import gql from "graphql-tag";

export default gql`
  mutation AddUser(
    $name: String
    $email: String
    $organizationId: String
    $teamId: String
  ) {
    addUser(
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
