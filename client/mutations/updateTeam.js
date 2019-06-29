import gql from "graphql-tag";

export default gql`
  mutation UpdateTeam($name: String) {
    updateTeam(name: $name) {
      id
      name
    }
  }
`;
