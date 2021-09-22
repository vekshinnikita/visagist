import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import store from "./state/store";
import "./styles/main.scss";

const rootNode = document.getElementById("root");

render(<Provider store={store}>{routes}</Provider>, rootNode);
