import gql from "graphql-tag";

export default gql`
  mutation UpdateTeam($name: String, $id: ID!) {
    updateTeam(name: $name, id: $id) {
      id
      name
    }
  }
`;
