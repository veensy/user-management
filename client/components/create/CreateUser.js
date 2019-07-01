import React, { Component } from "react";
import { Form, Jumbotron, Spinner, Button } from "react-bootstrap";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import getOrganizations from "../../queries/organizations";
import getTeams from "../../queries/teams";
import addUser from "../../mutations/addUser";
import query from "../../queries/users";

class CreateUser extends Component {
  state = {
    show: false,
    name:
      this.props.match.params.name &&
      this.props.match.params.name !== "undefined"
        ? this.props.match.params.name
        : "",
    email:
      this.props.match.params.email &&
      this.props.match.params.email !== "undefined"
        ? this.props.match.params.email
        : "",
    organizationId: undefined,
    organizationName: "" || this.props.match.params.organization,
    teamId: undefined,
    teamName: "" || this.props.match.params.team
  };

  renderOrganizations = () => {
    if (this.props.getOrganizations.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (
      !this.props.getOrganizations.loading &&
      this.props.getOrganizations.organizations.length > 0
    ) {
      return (
        <Form.Group
          controlId="exampleForm.ControlSelect3"
          onChange={this.handleOrganization}
        >
          <Form.Label>Organization</Form.Label>
          <Form.Control as="select" value={this.state.organizationName}>
            <option>Choose...</option>
            {this.props.getOrganizations.organizations.map(organization => {
              return (
                <option data-key={organization.id}>{organization.name}</option>
              );
            })}
          </Form.Control>
          {this.renderLinkOrganization()}
        </Form.Group>
      );
    } else {
      return <Form.Group>{this.renderLinkOrganization()}</Form.Group>;
    }
  };
  renderLinkOrganization = () => {
    return (
      <Link
        to={`/organizations/create/${this.state.name ||
          this.props.match.params.name}/${this.state.email ||
          this.props.match.params.email}/${this.state.organizationName ||
          this.props.match.params.organization}/${this.state.teamName ||
          this.props.match.params.team}`}
      >
        add a organization...
      </Link>
    );
  };
  renderTeams = () => {
    if (this.props.getTeams.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.getTeams.loading && this.props.getTeams.teams.length > 0) {
      return (
        <Form.Group
          controlId="exampleForm.ControlSelect3"
          onChange={this.handleTeam}
        >
          <Form.Label>Team</Form.Label>
          <Form.Control as="select" value={this.state.teamName}>
            <option>Choose...</option>
            {this.props.getTeams.teams.map(team => {
              return <option data-key={team.id}>{team.name}</option>;
            })}
          </Form.Control>
          {this.renderLinkTeam()}
        </Form.Group>
      );
    } else {
      return <Form.Group>{this.renderLinkTeam()}</Form.Group>;
    }
  };
  renderLinkTeam = () => {
    return (
      <Link
        to={`/teams/create/${this.state.name ||
          this.props.match.params.name}/${this.state.email ||
          this.props.match.params.email}/${this.state.organizationName ||
          this.props.match.params.organization}/${this.state.teamName ||
          this.props.match.params.team}`}
      >
        add a team...
      </Link>
    );
  };
  handleOrganization = e => {
    const selectedIndex = e.target.options.selectedIndex;
    const organizationId = e.target.options[selectedIndex].getAttribute(
      "data-key"
    );
    this.setState({ organizationId, organizationName: e.target.value });
  };
  handleTeam = e => {
    const selectedIndex = e.target.options.selectedIndex;
    const teamId = e.target.options[selectedIndex].getAttribute("data-key");
    this.setState({ teamId, teamName: e.target.value });
  };
  handleName = e => {
    this.setState({ name: e.target.value });
  };
  handleEmail = e => {
    this.setState({ email: e.target.value });
  };
  createUser = e => {
    e.preventDefault();
    const { name, email, organizationId, teamId } = this.state;

    if (name && email) {
      this.props.mutate({
        variables: {
          name,
          email,
          organizationId: organizationId
            ? organizationId
            : this.props.getOrganizations.organizations.length > 0 &&
              this.props.match.params.organization &&
              this.props.match.params.organization !== "undefined"
            ? this.props.getOrganizations.organizations[
                this.props.getOrganizations.organizations.length - 1
              ].id
            : undefined,
          teamId: teamId
            ? teamId
            : this.props.getTeams.teams.length > 0 &&
              this.props.match.params.team &&
              this.props.match.params.team !== "undefined"
            ? this.props.getTeams.teams[this.props.getTeams.teams.length - 1].id
            : undefined
        },
        refetchQueries: [{ query }]
      });
      this.props.history.push("/users");
    }
  };

  render() {
    return (
      <div className="col-lg-6 col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/users" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to User's List
          </Link>
        </div>
        <h1>Create user</h1>
        <Jumbotron>
          <Form onSubmit={this.createUser}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={this.handleName}
                value={this.state.name}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.handleEmail}
                value={this.state.email}
                required
              />
            </Form.Group>
            {this.renderOrganizations()}
            {this.renderTeams()}
            <Button variant="primary" type="submit" className="float-right">
              Submit
            </Button>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}

export default compose(
  graphql(getTeams, { name: "getTeams" }),
  graphql(getOrganizations, { name: "getOrganizations" }),
  graphql(addUser)
)(CreateUser);
