import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "../node_modules/@coreui/coreui/dist/css/coreui.min.css";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import "./App.scss";
import SignUp from "./pages/signup-page";
import LoginPage from "./pages/login-page";
import ForgotPasswordPage from "./pages/forgot-password-page";
import ProfilePreview from "./pages/profile-preview-page";
import DefaultLayout from "./containers/DefaultLayout/DefaultLayout";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

function App() {
  const username = localStorage.getItem("username");
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <div>
            <ToastsContainer
              store={ToastsStore}
              position={ToastsContainerPosition.BOTTOM_RIGHT}
            />
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LoginPage} />
              <Route
                exact
                path="/forgot-password"
                component={ForgotPasswordPage}
              />
              <Route
                exact
                path="/index"
                render={() => <Redirect to="/login" />}
              />

              <Route path="/" component={DefaultLayout} />
              <Route
                exact
                path="/profile-preview/"
                component={ProfilePreview}
              />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
