import React, { Component } from "react";
import { Table, Spinner, Pagination } from "react-bootstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import Modal from "modal-simple";
import query from "../queries/users";
import deleteUser from "../mutations/deleteUser";

class Users extends Component {
  state = {
    show: false,
    id: "",
    name: ""
  };
  renderList = () => {
    if (this.props.data.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.data.loading && this.props.data.users.length > 0) {
      return this.props.data.users.map((user, id) => {
        if (user.organization === null) {
          user.organization = "";
        }
        if (user.team === null) {
          user.team = "";
        }
        return (
          <tr key={user.id}>
            <td>{id + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.organization.name}</td>
            <td>{user.team.name}</td>
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
        variables: { id: this.state.id }
      })
      .then(() => this.props.data.refetch())
      .then(() => {
        this.onHide();
      });
  };
  handlePages = () => {
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
      return items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
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
        <div className="mx-auto ">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h1>User's list</h1>
            <Link to="/users/create" className="float-right">
              Add a new user
            </Link>
          </div>
          <Table responsive className="">
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
            <tbody>{this.renderList()}</tbody>
          </Table>
          <Pagination>{this.handlePages}</Pagination>
          {this.handleEmptyList()}
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

          {/* <Pagination
          https://stackoverflow.com/questions/49622281/react-bootstrap-pagination-not-showing
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemPerPage}
            totalItemsCount={this.state.duplicateProductList.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange()}
          /> */}
        </div>
      </div>
    );
  }
}
export default graphql(deleteUser)(graphql(query)(Users));
