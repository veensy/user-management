import gql from "graphql-tag";

export default gql`
  mutation UpdateOrganization($name: String) {
    updateOrganization(name: $name) {
      id
      name
    }
  }
`;
