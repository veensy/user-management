import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch, HashRouter } from "react-router-dom";

import Menu from "./components/Menu";
import Users from "./components/Users";

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
            </div>
          </div>
        </Switch>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
