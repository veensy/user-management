import React, { Component } from "react";
import { Table, Spinner, Pagination } from "react-bootstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import Modal from "modal-simple";
import query from "../queries/organizations";
import deleteOrganization from "../mutations/deleteOrganization";

class Organizations extends Component {
  state = {
    show: false,
    id: "",
    name: ""
  };
  deleteOrganizationConfirmation = (id, name) => {
    this.setState({ show: !this.state.show, id, name });
  };
  onHide = () => {
    this.setState({ show: !this.state.show });
  };
  deleteOrganization = () => {
    this.props
      .mutate({
        variables: { id: this.state.id }
      })
      .then(() => this.props.data.refetch())
      .then(() => {
        this.onHide();
      });
  };
  renderList = () => {
    if (this.props.data.loading) {
      return (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (!this.props.data.loading && this.props.data.organizations.length > 0) {
      return this.props.data.organizations.map((organization, id) => {
        return (
          <tr key={organization.id}>
            <td>{id + 1}</td>
            <td>{organization.name}</td>
            <td>
              {organization.users.map((user, id) => {
                return (
                  <span>
                    {user.name ? user.name : ""}
                    <br />
                  </span>
                );
              })}
            </td>
            <td>
              {organization.users.map((user, id) => {
                return (
                  <span>
                    {user.team ? user.team.name : ""}
                    <br />
                  </span>
                );
              })}
            </td>
            <td>
              <Link to={`organizations/edit/${organization.id}`}>
                <i className="material-icons">edit</i>
              </Link>
              <Link>
                <i
                  className="material-icons "
                  onClick={() =>
                    this.deleteOrganizationConfirmation(
                      organization.id,
                      organization.name
                    )
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
    if (!this.props.data.loading && this.props.data.organizations.length < 1) {
      return (
        <h3 className="text-danger">
          There's no organization register yet, please create a new one !
        </h3>
      );
    }
  };
  render() {
    return (
      <div className=" col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to Menu
          </Link>
        </div>
        <div className="mx-auto ">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h1>Organization's list</h1>
            <Link to="/organizations/create" className="float-right">
              Add a new organization
            </Link>
          </div>
          <Table responsive className="">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Users</th>
                <th scope="col">Teams</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>{this.renderList()}</tbody>
          </Table>
          {this.handleEmptyList()}
          <Modal
            show={this.state.show}
            onHide={this.onHide}
            title={{ text: `Delete ${this.state.name}'s organization ` }}
            bodyText={`Are you sure you want to delete ${this.state.name} ?`}
          >
            <Modal.Footer
              validate={{
                text: "Delete",
                variant: "primary",
                action: this.deleteOrganization
              }}
              cancel={{ text: "Cancel", variant: "secondary" }}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default graphql(deleteOrganization)(graphql(query)(Organizations));
