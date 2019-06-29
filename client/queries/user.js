import gql from "graphql-tag";

export default gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      organization {
        name
        id
      }
      team {
        name
        id
      }
    }
  }
`;
