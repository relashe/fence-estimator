import React from "react";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "../constants";
// Views
import Home from "../views/Home";

const AppRouter = () => {
  return (
    <Switch>
      <Route path={ROUTES.HOME} exact>
        <Home />
      </Route>
      <Route path="*">
        <Home />
      </Route>
    </Switch>
  );
};

export default AppRouter;
