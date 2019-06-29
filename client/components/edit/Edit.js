import React, { Component } from "react";
import { Form, Jumbotron, Spinner } from "react-bootstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import getUser from "../../queries/user";

class Edit extends Component {
  handleOrganization = e => {
    // console.log(e.target.value);
  };
  renderForm = () => {
    if (this.props.data.loading) {
      <Spinner animation="border" role="status" variant="primary">
        <span className="sr-only">Loading...</span>
      </Spinner>;
    }
    if (!this.props.data.loading) {
      const { user } = this.props.data;

      return (
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" defaultValue={user.name} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={user.email}
            />
          </Form.Group>
          <Form.Group
            controlId="exampleForm.ControlSelect3"
            onChange={this.handleOrganization}
          >
            <Form.Label>Organizations</Form.Label>
            <Form.Control as="select" defaultValue="2">
              <option>1</option>
              <option>2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            controlId="exampleForm.ControlSelect3"
            onChange={this.handleOrganization}
          >
            <Form.Label>Teams</Form.Label>
            <Form.Control as="select" defaultValue="2">
              <option>1</option>
              <option>2</option>
            </Form.Control>
          </Form.Group>
        </Form>
      );
    }
  };
  render() {
    return (
      <div className="col-lg-6 col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/users" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to Users List
          </Link>
        </div>
        <Jumbotron>{this.renderForm()}</Jumbotron>
      </div>
    );
  }
}

export default graphql(getUser, {
  options: props => {
    return {
      variables: {
        id: props.match.params.id
      }
    };
  }
})(Edit);
