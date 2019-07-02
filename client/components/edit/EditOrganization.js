import React, { Component } from "react";
import { Form, Jumbotron, Spinner, Button } from "react-bootstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import Modal from "modal-simple";
import _ from "lodash";
import query from "../../queries/organizations";
import getOrganization from "../../queries/organization";
import updateOrganization from "../../mutations/updateOrganization";

class EditOrganization extends Component {
  state = {
    show: false,
    name: undefined,
    info: {}
  };
  changedInfo = () => {
    if (this.state.name) {
      let name = `name : ${this.state.name}`;
      this.setState({ info: { name } });
    }
  };
  onHide = () => {
    this.setState({ show: !this.state.show });
  };
  handleName = e => {
    this.setState({ name: e.target.value });
  };
  updateOrganization = () => {
    const { name } = this.state;
    this.props.mutate({
      variables: {
        id: this.props.match.params.id,
        name
      },
      refetchQueries: [{ query }]
    });
    this.onHide();
    this.props.history.push("/organizations");
  };
  updateOrganizationConfirmation = e => {
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
      const { organization } = this.props.data;
      return (
        <Form onSubmit={this.updateOrganizationConfirmation}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              defaultValue={organization.name}
              onChange={this.handleName}
              value={this.state.name}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="float-right">
            Submit
          </Button>
        </Form>
      );
    }
  };
  render() {
    let isChange = undefined;
    if (_.isEmpty(this.state.info)) {
      isChange = "Return to Listing";
    } else {
      isChange = "Update";
    }
    return (
      <div className="col-lg-6 col-8 mx-auto  ">
        <div className="fixed-top">
          <Link to="/organizations" className="d-flex flex-row ">
            <i class="material-icons">arrow_left</i>Back to Organization's List
          </Link>
        </div>
        <h1>Edit organization</h1>
        <Jumbotron>{this.renderForm()}</Jumbotron>
        <Modal
          show={this.state.show}
          onHide={this.onHide}
          title={{ text: `Update organization's names` }}
        >
          <div>
            <p> Are you sure you want to change those informations ?</p>
            <ul>
              {this.state.info.name ? (
                <li>{this.state.info.name}</li>
              ) : (
                "Nothing change..."
              )}
            </ul>
          </div>
          <Modal.Footer
            validate={{
              text: isChange,
              variant: "primary",
              action: this.updateOrganization
            }}
            cancel={{ text: "Cancel", variant: "secondary" }}
          />
        </Modal>
      </div>
    );
  }
}

export default graphql(updateOrganization)(
  graphql(getOrganization, {
    options: props => {
      return {
        variables: {
          id: props.match.params.id
        }
      };
    }
  })(EditOrganization)
);
