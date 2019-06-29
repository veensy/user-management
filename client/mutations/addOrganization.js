import gql from "graphql-tag";

export default gql`
  mutation AddOrganization($name: String) {
    addOrganization(name: $name) {
      id
      name
    }
  }
`;
