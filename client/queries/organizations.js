import gql from "graphql-tag";

export default gql`
  {
    organizations {
      id
      name
      users {
        id
        name
        team {
          id
          name
        }
      }
    }
  }
`;
