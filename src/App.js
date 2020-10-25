import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "../node_modules/@coreui/coreui/dist/css/coreui.min.css";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from "react-toasts";
import './App.scss';
import SignUp from './pages/signup-page';
import LoginPage from './pages/login-page';
import ForgotPasswordPage from './pages/forgot-password-page';

import DefaultLayout from "./containers/DefaultLayout/DefaultLayout";

function App() {
  return (
        <Router>
          <div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/forgot-password" component={ForgotPasswordPage} />              
              <Route exact path="/index" render={() => <Redirect to="/login" />} />
              
              <Route path="/" component={DefaultLayout} />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
  );
}

export default App;
