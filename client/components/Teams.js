import React, { Component } from "react";
import { Table, Spinner,Jumbotron } from "react-bootstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import Modal from "modal-simple";
import Pagination from "react-js-pagination";
import query from "../queries/teams";
import deleteTeam from "../mutations/deleteTeam";

class Teams extends Component {
  state = {
    show: false,
    id: "",
    name: "",
    activePage: 1,
    itemPerPage: 5,
    teamList: this.props.data.loading ? [] : this.props.data.teams
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.data.loading !== prevProps.data.loading) {
      this.setState({
        teamList: this.props.data.teams
      });
    }
  }
  deleteTeamConfirmation = (id, name) => {
    this.setState({ show: !this.state.show, id, name });
  };
  onHide = () => {
    this.setState({ show: !this.state.show });
  };
  deleteTeam = () => {
    this.props
      .mutate({
        variables: { id: this.state.id },
        refetchQueries: [{ query }]
      })
      .then(() => {
        this.onHide();
      });
  };
  renderList = (renderedProjects, count) => {
    if (this.props.data.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.data.loading && this.props.data.teams.length > 0) {
      return renderedProjects.map((team, id) => {
        return (
          <tr key={team.id}>
            <td>{count + id + 1}</td>
            <td>
              <Link to={`details/${team.id}/team`}>{team.name}</Link>
            </td>
            <td>
              {team.users.map((user, id) => {
                const userId = user.id ? user.id : "";
                return (
                  <p className="mb-2">
                    <Link to={`details/${userId}/user`}>
                      {user.name ? user.name : ""}
                    </Link>
                  </p>
                );
              })}
            </td>
            <td>
              {team.users.map((user, id) => {
                const organizationId = user.organization
                  ? user.organization.id
                  : "";
                return (
                  <p className="mb-2">
                    <Link to={`details/${organizationId}/user`}>
                      {user.organization ? user.organization.name : ""}
                    </Link>
                  </p>
                );
              })}
            </td>
            <td>
              <Link to={`teams/edit/${team.id}`}>
                <i className="material-icons">edit</i>
              </Link>
              <Link>
                <i
                  className="material-icons "
                  onClick={() =>
                    this.deleteTeamConfirmation(team.id, team.name)
                  }
                >
                  delete_forever
                </i>
              </Link>
            </td>
          </tr>
        );
      });
    }
  };
  handleEmptyList = () => {
    if (!this.props.data.loading && this.props.data.teams.length < 1) {
      return (
        <h3 className="text-danger">
          There's no team register yet, please create a new one !
        </h3>
      );
    }
  };
  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };
  render() {
    var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
    var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
    var renderedProjects = this.state.teamList.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );
    return (
      <div className="col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to Menu
          </Link>
        </div>
        <Jumbotron>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h1>Team's list</h1>
            <Link to="/teams/create" className="float-right">
              Add a new team
            </Link>
          </div>
          <Table responsive className="">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Users</th>
                <th scope="col">Organizations</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>{this.renderList(renderedProjects, indexOfFirstTodo)}</tbody>
          </Table>
          {this.handleEmptyList()}
          <div className=" d-flex justify-content-center">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemPerPage}
              totalItemsCount={this.state.teamList.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
          <Modal
            show={this.state.show}
            onHide={this.onHide}
            title={{ text: `Delete ${this.state.name}'s team ` }}
            bodyText={`Are you sure you want to delete ${this.state.name} ?`}
          >
            <Modal.Footer
              validate={{
                text: "Delete",
                variant: "primary",
                action: this.deleteTeam
              }}
              cancel={{ text: "Cancel", variant: "secondary" }}
            />
          </Modal>
        </Jumbotron>
      </div>
    );
  }
}

export default graphql(deleteTeam)(graphql(query)(Teams));
