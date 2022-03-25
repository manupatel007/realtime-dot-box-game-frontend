import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Paths from "./Paths";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Paths />
  </BrowserRouter>,
  rootElement
);
