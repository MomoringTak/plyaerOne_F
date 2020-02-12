import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import BookDetail from "../Screens/BookDetail";
import Booklist from "../Screens/Booklist";
import Shelf from "../Screens/Shelf";
import Search from "../Screens/Search";
import EditProfile from "../Screens/EditProfile";
import AddBook from "../Screens/AddBook";

import Header from "./Header";

export default () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/booklist:id" component={Booklist} />
          <Route path="/user:id/shelf" component={Shelf} />
          <Route path="/user:id/profile" component={Profile} />
          <Route path="/user:id/editprofile" component={EditProfile} />
          <Route path="/user:id/addbook" component={AddBook} />
          <Route path="/book:id" component={BookDetail} />

          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};
