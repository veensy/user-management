import React, { Component } from "react";
import { Form, Jumbotron, Spinner, Button } from "react-bootstrap";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import Modal from "modal-simple";
import addOrganization from "../../mutations/addOrganization";
import query from "../../queries/organizations";

class CreateOrganization extends Component {
  state = {
    show: false,
    name: ""
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };
  registerOrganization = e => {
    e.preventDefault();
    const { name } = this.state;
    this.props.mutate({
      variables: {
        name
      },
      refetchQueries: [{ query }]
    });
    if (
      this.props.match.params.name ||
      this.props.match.params.email ||
      this.props.match.params.organizationId ||
      this.props.match.params.teamId
    ) {
      this.props.history.push(
        `/users/create/${this.props.match.params.name}/${
          this.props.match.params.email
        }/${this.state.name}/${
          this.props.match.params.team
        }`
      );
    } else {
      this.props.history.push("/organizations");
    }
  };
  render() {
    return (
      <div className="col-lg-6 col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/organizations" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to Organization's List
          </Link>
        </div>
        <h1>Create organization</h1>
        <Jumbotron>
          <Form onSubmit={this.registerOrganization}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Name"
                onChange={this.handleName}
                value={this.state.name}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="float-right">
              Submit
            </Button>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}

export default graphql(addOrganization)(CreateOrganization);
