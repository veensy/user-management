import gql from "graphql-tag";

export default gql`
  {
    organizations {
      id
      name
    }
  }
`;
