import React, { useEffect } from "react";
import GlobalStyle from "./globalStyles";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, HashRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignupPage";
import Pricing from "./pages/PricingPage";
import { Sitios } from "./pages/Sitios";
import { Login } from "./components/Auth/Login";
import { AdminPage } from "./pages/AdminPage";
import { startChecking } from "./actions/auth";
import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  console.log(process.env);

  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  if (checking) {
    return <h5>Espere...</h5>;
  }

  return (
    <HashRouter>
      <GlobalStyle />
      <Switch>
        {/* <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/pricing">
            <Pricing />
          </Route>
          <Route path="/sitios">
            <Sitios />
          </Route> */}
        <PublicRoute exact path="/" component={Home} isAuthenticated={!!uid} />
        <PublicRoute
          exact
          path="/signup"
          component={SignUp}
          isAuthenticated={!!uid}
        />
        <PublicRoute
          exact
          path="/pricing"
          component={Pricing}
          isAuthenticated={!!uid}
        />
        <PublicRoute
          exact
          path="/sitios"
          component={Sitios}
          isAuthenticated={!!uid}
        />
        <PublicRoute
          exact
          path="/Login"
          component={Login}
          isAuthenticated={!!uid}
        />
        <PrivateRoute
          exact
          path="/admin-panel"
          component={AdminPage}
          isAuthenticated={!!uid}
        />

        {/* <Route path="/Login">
          <Login />
        </Route>
        <Route path="/admin-panel"></Route> */}
      </Switch>
    </HashRouter>
  );
}

export default App;
