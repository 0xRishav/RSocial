import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Landing } from "./pages";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <AppWrapper>
        <Switch>
          <Route path="/" component={Landing} />
        </Switch>
      </AppWrapper>
    </div>
  );
}

const AppWrapper = styled.div`
  width: 80%;
  margin: auto;
`;

export default App;
