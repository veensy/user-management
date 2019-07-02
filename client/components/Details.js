import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import {
  Card,
  Spinner,
  ListGroup,
  ListGroupItem,
  Jumbotron
} from "react-bootstrap";
import getUsers from "../queries/users";
import getUser from "../queries/user";
import getOrganization from "../queries/organization";
import getTeam from "../queries/team";

class Details extends Component {
  renderDetails = () => {
    switch (this.props.match.params.name) {
      case "user":
        return this.userDetails();
        break;
      case "organization":
        return this.organizationDetails();
        break;
      case "team":
        return this.teamDetails();
        break;
      default:
        break;
    }
  };
  userDetails = () => {
    if (this.props.getUser.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.getUser.loading) {
      const { user } = this.props.getUser;
      return (
        <div>
          <Card.Body>
            <Card.Title className="text-center">
              <h3>{user.name}</h3>
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <span className="text-muted mr-2">Email:</span> {user.email}
            </ListGroupItem>
            <ListGroupItem>
              <span className="text-muted mr-2">Organization:</span>{" "}
              {user.organization ? (
                user.organization.name
              ) : (
                <p>
                  this user doesn't have an organization yet{" "}
                  <Link to={`/users/edit/${user.id}`}>add one</Link>
                </p>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <span className="text-muted mr-2">Team:</span>{" "}
              {user.team ? (
                user.team.name
              ) : (
                <p>
                  this user doesn't have a team yet{" "}
                  <Link to={`/users/edit/${user.id}`}>add one</Link>
                </p>
              )}
            </ListGroupItem>
          </ListGroup>
        </div>
      );
    }
  };
  organizationDetails = () => {
    if (this.props.getOrganization.loading || this.props.getUsers.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.getOrganization.loading && !this.props.getUsers.loading) {
      const { organization } = this.props.getOrganization;

      const usersName = [];
      const teamsName = [];
      this.props.getUsers.users.map((user, id) => {
        if (
          user.organization &&
          user.organization.id === this.props.match.params.id
        ) {
          usersName.push(user.name);
          if (user.team) {
            teamsName.push(user.team.name);
          }
        }
      });

      return (
        <div>
          <Card.Body>
            <Card.Title className="text-center">
              <h3>{organization.name}</h3>
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <span className="text-muted mr-2">Users:</span>
              {usersName.length > 0 ? (
                usersName.map((name, id) => {
                  let compare = usersName.length - 1;
                  let isComa;
                  if (compare === id) {
                    isComa = "";
                  } else {
                    isComa = ",";
                  }
                  return (
                    <span>
                      {name}
                      {isComa}{" "}
                    </span>
                  );
                })
              ) : (
                <p>
                  this organization doesn't have users yet{" "}
                  <Link to={`users/create`}>add one</Link>
                </p>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <span className="text-muted mr-2">Teams:</span>{" "}
              {teamsName.length > 0 ? (
                teamsName.map((name, id) => {
                  let compare = teamsName.length - 1;
                  let isComa;
                  if (compare === id) {
                    isComa = "";
                  } else {
                    isComa = ",";
                  }
                  return (
                    <span>
                      {name}
                      {isComa}{" "}
                    </span>
                  );
                })
              ) : (
                <p>
                  this organization doesn't have teams yet{" "}
                  <Link to={`users/create`}>add one</Link>
                </p>
              )}
            </ListGroupItem>
          </ListGroup>
        </div>
      );
    }
  };
  teamDetails = () => {
    if (this.props.getTeam.loading || this.props.getUsers.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.getTeam.loading && !this.props.getUsers.loading) {
      const { team } = this.props.getTeam;

      const usersName = [];
      const organizationsName = [];
      this.props.getUsers.users.map((user, id) => {
        if (user.team && user.team.id === this.props.match.params.id) {
          usersName.push(user.name);
          if (user.organization) {
            organizationsName.push(user.organization.name);
          }
        }
      });

      return (
        <div>
          <Card.Body>
            <Card.Title className="text-center">
              <h3>{team.name}</h3>
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <span className="text-muted mr-2">Users:</span>
              {usersName.length > 0 ? (
                usersName.map((name, id) => {
                  let compare = usersName.length - 1;
                  let isComa;
                  if (compare === id) {
                    isComa = "";
                  } else {
                    isComa = ",";
                  }
                  return (
                    <span>
                      {name}
                      {isComa}{" "}
                    </span>
                  );
                })
              ) : (
                <p>
                  this team doesn't have users yet{" "}
                  <Link to={`users/create`}>add one</Link>
                </p>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <span className="text-muted mr-2">Organizations:</span>{" "}
              {organizationsName.length > 0 ? (
                organizationsName.map((name, id) => {
                  let compare = organizationsName.length - 1;
                  let isComa;
                  if (compare === id) {
                    isComa = "";
                  } else {
                    isComa = ",";
                  }
                  return (
                    <span>
                      {name}
                      {isComa}{" "}
                    </span>
                  );
                })
              ) : (
                <p>
                  this team doesn't have organizations yet{" "}
                  <Link to={`users/create`}>add one</Link>
                </p>
              )}
            </ListGroupItem>
          </ListGroup>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to Menu
          </Link>
        </div>
        <Jumbotron>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h1>Details</h1>
            <Link
              to={`/${this.props.match.params.name}s/create`}
              className="float-right"
            >
              {`Add a new ${this.props.match.params.name}`}
            </Link>
          </div>
          <Card className="bg-secondary">{this.renderDetails()}</Card>
        </Jumbotron>
      </div>
    );
  }
}

export default compose(
  graphql(getUsers, { name: "getUsers" }),
  graphql(getUser, {
    name: "getUser",
    skip: props => props.match.params.name != "user",
    options: props => ({ variables: { id: props.match.params.id } })
  }),
  graphql(getTeam, {
    name: "getTeam",
    skip: props => props.match.params.name != "team",
    options: props => ({ variables: { id: props.match.params.id } })
  }),
  graphql(getOrganization, {
    name: "getOrganization",
    skip: props => props.match.params.name != "organization",
    options: props => ({ variables: { id: props.match.params.id } })
  })
)(Details);
