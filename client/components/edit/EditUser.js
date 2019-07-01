import React, { Component } from "react";
import { Form, Jumbotron, Spinner, Button } from "react-bootstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import Modal from "modal-simple";
import query from "../../queries/users";
import getUser from "../../queries/user";
import updateUser from "../../mutations/updateUser";

class Edit extends Component {
  state = {
    show: false,
    name: undefined,
    email: undefined,
    organizationId: undefined,
    teamId: undefined,
    organizationName: "",
    teamName: "",
    info: {}
  };
  changedInfo = () => {
    let name;
    let email;
    let organization;
    let team;
    if (this.state.name) {
      name = `name : ${this.state.name}`;
    }
    if (this.state.email) {
      email = `email : ${this.state.email}`;
    }
    if (this.state.organizationName) {
      organization = `organization : ${this.state.organizationName}`;
    }
    if (this.state.teamName) {
      team = `team : ${this.state.teamName}`;
    }
    this.setState({ info: { name, email, organization, team } });
  };
  onHide = () => {
    this.setState({ show: !this.state.show });
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
  updateUser = () => {
    const { name, email, organizationId, teamId } = this.state;
    this.props.mutate({
      variables: {
        id: this.props.match.params.id,
        name,
        email,
        organizationId,
        teamId
      },
      refetchQueries: [{ query }]
    });
    this.onHide();
    this.props.history.push("/users");
  };
  updateUserConfirmation = e => {
    e.preventDefault();
    this.changedInfo();
    this.setState({ show: !this.state.show });
  };

  renderForm = () => {
    if (this.props.data.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.data.loading) {
      const { user } = this.props.data;

      const organizationName = user.organization
        ? user.organization.name
        : "...";
      const teamName = user.team ? user.team.name : "...";

      return (
        <Form onSubmit={this.updateUserConfirmation}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              defaultValue={user.name}
              onChange={this.handleName}
              value={this.state.name}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={user.email}
              onChange={this.handleEmail}
              value={this.state.email}
            />
          </Form.Group>
          {this.renderOrganization(organizationName)}
          {this.renderTeams(teamName)}
          <Button variant="primary" type="submit" className="float-right">
            Submit
          </Button>
        </Form>
      );
    }
  };
  renderOrganization = name => {
    return (
      <Form.Group
        controlId="exampleForm.ControlSelect3"
        onChange={this.handleOrganization}
      >
        <Form.Label>Organization</Form.Label>
        <Form.Control as="select" defaultValue={name}>
          {this.props.data.organizations.map(organization => {
            return (
              <option data-key={organization.id}>{organization.name}</option>
            );
          })}
        </Form.Control>
      </Form.Group>
    );
  };
  renderTeams = name => {
    return (
      <Form.Group
        controlId="exampleForm.ControlSelect3"
        onChange={this.handleTeam}
      >
        <Form.Label>Team</Form.Label>
        <Form.Control as="select" defaultValue={name}>
          {this.props.data.teams.map(team => {
            return <option data-key={team.id}>{team.name}</option>;
          })}
        </Form.Control>
      </Form.Group>
    );
  };
  render() {
    return (
      <div className="col-lg-6 col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/users" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to User's List
          </Link>
        </div>
        <h1>Edit user</h1>
        <Jumbotron>{this.renderForm()}</Jumbotron>
        <Modal
          show={this.state.show}
          onHide={this.onHide}
          title={{ text: `Update user's informations` }}
        >
          <div>
            <p> Are you sure you want to change those informations ?</p>
            <ul>
              {this.state.info.name ? <li>{this.state.info.name}</li> : null}
              {this.state.info.email ? <li>{this.state.info.email}</li> : null}
              {this.state.info.organization ? (
                <li>{this.state.info.organization}</li>
              ) : null}
              {this.state.info.team ? <li>{this.state.info.team}</li> : null}
            </ul>
          </div>
          <Modal.Footer
            validate={{
              text: "Update",
              variant: "primary",
              action: this.updateUser
            }}
            cancel={{ text: "Cancel", variant: "secondary" }}
          />
        </Modal>
      </div>
    );
  }
}

export default graphql(updateUser)(
  graphql(getUser, {
    options: props => {
      return {
        variables: {
          id: props.match.params.id
        }
      };
    }
  })(Edit)
);
