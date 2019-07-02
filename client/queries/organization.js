import gql from "graphql-tag";

export default gql`
  query getOrganization($id: ID!) {
    organization(id: $id) {
      id
      name
    }
    users {
      id
      name
      email
    }
    teams {
      id
      name
    }
  }
`;
