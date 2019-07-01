import gql from "graphql-tag";

export default gql`
  {
    teams {
      id
      name
      users {
        name
        id
        organization {
          id
          name
        }
      }
    }
  }
`;
