import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import "./Menu.scss";

class App extends React.Component {
  render() {
    return (
      // <div className="container-fluid h-100 home">
      //   <div className="row align-items-center h-100">
      <div className="col-lg-6 col-8 mx-auto Menu">
        <Jumbotron>
          <h1 className="mb-5 text-center">User management system</h1>
          <div className="d-flex flex-column  mx-auto  ">
            <Link to="/users" className="mx-auto">
              <Button
                variant="outline-primary"
                size="lg"
                className="btn-menu mb-3"
              >
                Users
              </Button>
            </Link>
            <Link to="/organizations" className="mx-auto">
              <Button
                variant="outline-primary"
                size="lg"
                className="btn-menu mb-3"
              >
                Organizations
              </Button>
            </Link>
            <Link to="/teams" className="mx-auto">
              <Button
                variant="outline-primary"
                size="lg"
                className="btn-menu mb-3"
              >
                Teams
              </Button>
            </Link>
          </div>
        </Jumbotron>
      </div>
      //   </div>
      // </div>
    );
  }
}
export default App;
