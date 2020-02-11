import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import Book from "../Screens/Book";
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
          <Route path="/user:id/profile" exact component={Profile} />
          <Route path="/user:id/editprofile" exact component={EditProfile} />
          <Route path="/search" component={Search} />
          <Route path="/user:id/addbook" component={AddBook} />
          <Route path="/book:id" component={BookDetail} />
          <Route path="/booklist:id" exact component={Booklist} />
          <Route path="/user:id/shelf" exact component={Shelf} />

          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};
