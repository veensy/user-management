import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch, HashRouter } from "react-router-dom";

import Menu from "./components/Menu";
import Users from "./components/Users";
import EditUser from "./components/edit/EditUser";
import CreateUser from "./components/create/CreateUser";
import Organizations from "./components/Organizations";
import EditOrganization from "./components/edit/EditOrganization";
import CreateOrganization from "./components/create/CreateOrganization";
import Teams from "./components/Teams";
import EditTeam from "./components/edit/EditTeam";
import CreateTeam from "./components/create/CreateTeam";
import Details from "./components/Details";

const client = new ApolloClient({
  uri: "/graphql",
  dataIdFromObject: o => o.id
});
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Switch>
          <div className="container-fluid h-100">
            <div className="row align-items-center h-100">
              <Route exact path="/" component={Menu} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/edit/:id" component={EditUser} />
              <Route
                path="/users/create/:name?/:email?/:organization?/:team?"
                component={CreateUser}
              />
              <Route exact path="/organizations" component={Organizations} />
              <Route
                exact
                path="/organizations/edit/:id"
                component={EditOrganization}
              />
              <Route
                path="/organizations/create/:name?/:email?/:organization?/:team?"
                component={CreateOrganization}
              />
              <Route
                path="/teams/create/:name?/:email?/:organization?/:team?"
                component={CreateTeam}
              />
              <Route exact path="/teams" component={Teams} />
              <Route exact path="/teams/edit/:id" component={EditTeam} />
              <Route path="/details/:id?/:name?" component={Details} />
            </div>
          </div>
        </Switch>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
