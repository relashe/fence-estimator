import React from "react";
import { HashRouter as Router } from "react-router-dom";
// Containers
import AppRouter from "app/containers/AppRouter";

const Root = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default Root;
