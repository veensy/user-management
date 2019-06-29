import gql from "graphql-tag";

export default gql`
  mutation AddTeam($name: String) {
    addTeam(name: $name) {
      id
      name
    }
  }
`;
