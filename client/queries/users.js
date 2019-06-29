import gql from "graphql-tag";

export default gql`
  {
    users {
      id
      name
      email
      organization {
        id
        name
      }
      team {
        id
        name
      }
    }
  }
`;
