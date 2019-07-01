import gql from "graphql-tag";

export default gql`
  mutation DeleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      name
    }
  }
`;
