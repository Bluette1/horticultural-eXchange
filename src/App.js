import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Router, Switch, Route, Link,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.png';
import history from './helpers/history';
import Login from './components/Login';
import Register from './components/Register';
import Deregister from './components/Deregister';
import Home from './components/Home';
import Profile from './components/Profile';
import StripeLoader from './components/StripeLoader';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Product from './components/Product';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';
import PlantForm from './components/ProductForm';
import CategoryForm from './components/CategoryForm';
import ProductFilter from './components/ProductFilter';
import UpdatePrdctForm from './components/UpdatePrdctForm';
import { logout } from './actions/auth';
import { clearMessage } from './actions/message';
import ProductList from './components/ProductList';

const App = () => {
  // const history = useHistory();
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);

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
    dispatch(logout(currentUser));
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-navbar d-flex justify-content-around justify-content-lg-between">
          <div>
            <div className="navbar-nav mr-auto">
              <Link to="/" className="navbar-brand">
                <img
                  style={{
                    marginRight: '2px',
                    width: '30px',
                    height: '30px',
                    borderRadius: 50,
                  }}
                  src={logo}
                  alt="logo"
                />
                {' '}
                XChange
              </Link>
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to="/mod" className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to="/wishlist" className="nav-link">
                    Browse Wishlist
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    {currentUser.email}
                  </Link>
                </li>
              )}
            </div>
          </div>

          <div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item d-flex">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Logout
                  </a>
                  {message && (
                    <span className="alert alert-danger">{message}</span>
                  )}
                </li>
                <li className="nav-item d-flex">
                  <Link to="/cart" className="nav-link">
                    <i className="fa fa-shopping-cart" aria-hidden="true" />
                    <span
                      style={{
                        borderRadius: '45%',
                        backgroundColor: '#008000',
                        color: 'white',
                        fontSize: '8px',
                        padding: '3px',
                        marginRight: '3px',
                      }}
                    >
                      {cartItems.length}
                    </span>
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/deregister" component={Deregister} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/payment" component={StripeLoader} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/new-plant" component={PlantForm} />
            <Route exact path="/new-category" component={CategoryForm} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route path="/category-product/" component={ProductList} />
            <Route path="/product/" component={Product} />
            <Route
              exact
              path="/update-product/select"
              component={ProductFilter}
            />
            <Route
              exact
              path="/update-product/form"
              component={UpdatePrdctForm}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
