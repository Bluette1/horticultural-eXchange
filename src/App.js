import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./logo.png";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import StripeLoader from "./components/StripeLoader";
import Cart from "./components/Cart";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import PlantForm from './components/PlantForm';
import CategoryForm from './components/CategoryForm';
import Category from './components/Category';
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const cartItems = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.supervisor_role);
      setShowAdminBoard(currentUser.superadmin_role);
    }
  }, [currentUser]);

  const logOut = (e) => {
    e.preventDefault();
    dispatch(logout())
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-around justify-content-lg-between">
        <div>
       
          <div className="navbar-nav mr-auto">
          <Link to={"/"} className="navbar-brand">
            <img
              style={{
                marginRight: "2px",
                width: "30px",
                height: "30px",
                borderRadius: 50,
              }}
              src={logo}
              alt=""
            />{" "}
            XChange
          </Link>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
              
            )}
            {currentUser && (<li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.email}
              </Link>
            </li>)}
            
          </div>
        </div>

          <div>{currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item d-flex">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
                {message && (
                  <span className="alert alert-danger">
                    {message}
                  </span>
                )}
              </li>
              <li className="nav-item d-flex">
              <Link to={"/cart"} className="nav-link">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              <span style={{
                borderRadius: "40%", backgroundColor: "#9d9d9d", color: "white", fontSize: "8px",
                padding: "2px", marginRight: "3px",
                }}>{cartItems.length}</span>
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}</div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/payment" component={StripeLoader} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/new-plant" component={PlantForm} />
            <Route exact path="/new-category" component={CategoryForm} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/category/" component={Category} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
