import gql from "graphql-tag";

export default gql`
  mutation DeleteOrganization($id: ID!) {
    deleteOrganization(id: $id) {
      name
    }
  }
`;
