import React from "react";
import { createHashHistory } from "history";
// Components
import Root from "app/views/Root";

export const history = createHashHistory();

const App = () => {
  return <Root />;
};

export default App;
