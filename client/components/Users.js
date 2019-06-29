import React, { Component } from "react";
import { Table, Spinner, Pagination } from "react-bootstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import query from "../queries/users";
import Modal from "modal-simple";

class Users extends Component {
  state = {
    show: false,
    id: "",
    name: ""
    // activePage: 1,
    // itemPerPage: 3,
    // productList: [],
    // duplicateProductList: []
  };
  renderList = () => {
    if (this.props.data.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.data.loading) {
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
              <Link to={`users/edit/${user.id}`} >
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
  deleteUserConfirmation = (id, name) => {
    this.setState({ show: !this.state.show, id, name });
  };
  onHide = () => {
    this.setState({ show: !this.state.show });
  };
  deleteUser = () => {
    console.log("tes");
  };

  render() {
    return (
      <div className="col-lg-6 col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to Menu
          </Link>
        </div>
        <div className="mx-auto ">
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
export default graphql(query)(Users);
