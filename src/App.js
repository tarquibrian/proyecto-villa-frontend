import React, { useEffect, useLayoutEffect, useState } from "react";
import GlobalStyle from "./globalStyles";
import Aos from "aos";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Switch,
  HashRouter,
  useLocation,
} from "react-router-dom";
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
import { Users } from "./pages/Users";
import { Single } from "./pages/single/Single";
import { NewPost } from "./pages/newpost/NewPost";
import { HistoriaHome } from "./components/Historia/HistoriaHome";
import { SingleHistoria } from "./pages/single/SingleHistoria";
import { Historias } from "./pages/Historias";
import { Eventos } from "./pages/Eventos";
import { Navbar } from "./components/Navbar";
import { Dropdow } from "./components/Dropdow";
import { Loading } from "./components/Loading/Loading";

function App() {
  console.log(process.env);
  console.log("NOTIFICACION");

  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    dispatch(startChecking());
    Aos.init({});
  }, [dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (checking) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      {uid === undefined && <Navbar toggle={toggle} />}
      <Dropdow isOpen={isOpen} toggle={toggle} />
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
          path="/eventos"
          component={Eventos}
          isAuthenticated={!!uid}
        />
        <PublicRoute
          exact
          path="/historias"
          component={Historias}
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
        <PublicRoute
          path="/postHome/:postId"
          component={SingleHistoria}
          isAuthenticated={!!uid}
        />
        <PrivateRoute
          path="/post/:postId"
          component={Single}
          isAuthenticated={!!uid}
        />
        <PrivateRoute
          path="/newpost"
          component={NewPost}
          isAuthenticated={!!uid}
        />
        <PrivateRoute
          exact
          path="/admin-panel"
          component={AdminPage}
          isAuthenticated={!!uid}
        />
        <PrivateRoute
          exact
          path="/admin-users"
          component={Users}
          isAuthenticated={!!uid}
        />

        {/* <Route path="/Login">
          <Login />
        </Route>
        <Route path="/admin-panel"></Route> */}
      </Switch>
    </>
  );
}

export default App;
