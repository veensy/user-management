import gql from "graphql-tag";

export default gql`
  query getTeam($id: ID!) {
    team(id: $id) {
      id
      name
    }
    users {
      id
      name
      email
    }
    organizations {
      id
      name
    }
  }
`;
