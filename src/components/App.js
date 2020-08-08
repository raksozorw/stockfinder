import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./MUI";

import Header from "./Header";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import "../styles.css";
import set404 from "./set404";

export default function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <div className='app'>
          <div className='darkened'>
            <Header />
            <Switch>
              <Route path='/' exact component={Login} />
              <Route path='/home' exact component={Dashboard} />

              <Route path='*' exact={true} component={set404} />
            </Switch>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}
