import gql from "graphql-tag";

export default gql`
  mutation UpdateOrganization($name: String, $id: ID!) {
    updateOrganization(name: $name, id: $id) {
      id
      name
    }
  }
`;
