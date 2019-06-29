import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/users";

class Users extends Component {
  render() {
    console.log(this.props);
    return <div>Users</div>;
  }
}
export default graphql(query)(Users);
