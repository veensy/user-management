import React, { Component } from "react";
import { Form, Jumbotron, Spinner, Button } from "react-bootstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import Modal from "modal-simple";
import addTeam from "../../mutations/addTeam";
import query from "../../queries/teams";

class CreateTeam extends Component {
  state = {
    show: false,
    name: ""
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };
  registerTeam = e => {
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
        }/${this.props.match.params.organization}/${this.state.name}`
      );
    } else {
      this.props.history.push("/teams");
    }
  };
  render() {
    return (
      <div className="col-lg-6 col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/teams" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to Team's List
          </Link>
        </div>
        <h1>Create team</h1>
        <Jumbotron>
          <Form onSubmit={this.registerTeam}>
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

export default graphql(addTeam)(CreateTeam);
