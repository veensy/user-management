import React, { Component } from "react";
import { Table, Spinner, Jumbotron } from "react-bootstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import Modal from "modal-simple";
import query from "../queries/users";
import deleteUser from "../mutations/deleteUser";
import Pagination from "react-js-pagination";

class Users extends Component {
  state = {
    show: false,
    id: "",
    name: "",
    activePage: 1,
    itemPerPage: 5,
    userList: this.props.data.loading ? [] : this.props.data.users
  };
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.data.loading !== prevProps.data.loading)||!this.props.data.loading &&
    this.props.data.users !== prevState.userList) {
      this.setState({
        userList: this.props.data.users
      });
    }
   
  }

  renderList = (renderedProjects, count) => {
    if (this.props.data.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.data.loading && this.props.data.users.length > 0) {
      return renderedProjects.map((user, id) => {
        if (user.organization === null) {
          user.organization = "";
        }
        if (user.team === null) {
          user.team = "";
        }

        return (
          <tr key={user.id}>
            <td>{count + id + 1}</td>
            <td>
              <Link to={`details/${user.id}/user`}>{user.name}</Link>
            </td>
            <td>{user.email}</td>
            <td>
              <Link to={`details/${user.organization.id}/organization`}>
                {user.organization.name}
              </Link>
            </td>
            <td>
              <Link to={`details/${user.team.id}/team`}>{user.team.name}</Link>
            </td>
            <td>
              <Link to={`users/edit/${user.id}`}>
                <i className="material-icons">edit</i>
              </Link>
              <Link>
                <i
                  className="material-icons "
                  onClick={() =>
                    this.deleteUserConfirmation(user.id, user.name)
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
    if (!this.props.data.loading && this.props.data.users.length < 1) {
      return (
        <h3 className="text-danger">
          There's no users register yet, please create a new one !
        </h3>
      );
    }
  };
  deleteUserConfirmation = (id, name) => {
    this.setState({ show: !this.state.show, id, name });
  };
  onHide = () => {
    this.setState({ show: !this.state.show });
  };
  deleteUser = () => {
    this.props
      .mutate({
        variables: { id: this.state.id },
        refetchQueries: [{ query }]
      })
      .then(() => {
        this.onHide();
      });
  };
  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
    var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
    var renderedProjects = this.state.userList.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );
    return (
      <div className="col-10 mx-auto  ">
        <div className="fixed-top">
          <Link to="/" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to Menu
          </Link>
        </div>
        <Jumbotron>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h1>User's list</h1>
            <Link to="/users/create" className="float-right">
              Add a new user
            </Link>
          </div>
          <Table className="h-50">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Email</th>
                <th scope="col">Organization</th>
                <th scope="col">Team</th>
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
              totalItemsCount={this.state.userList.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>

          <Modal
            show={this.state.show}
            onHide={this.onHide}
            title={{ text: `Delete ${this.state.name}'s informations` }}
            bodyText={`Are you sure you want to delete all informations about ${
              this.state.name
            } ?`}
          >
            <Modal.Footer
              validate={{
                text: "Delete",
                variant: "primary",
                action: this.deleteUser
              }}
              cancel={{ text: "Cancel", variant: "secondary" }}
            />
          </Modal>
        </Jumbotron>
      </div>
    );
  }
}
export default graphql(deleteUser)(graphql(query)(Users));
