import React from "react";
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
import BooklistDetail from "../Screens/BooklistDetail";
import Shelf from "../Screens/Shelf";
import UserShelf from "../Screens/UserShelf";
import EditProfile from "../Screens/EditProfile";
import AddBook from "../Screens/AddBook";
import AddBookList from "../Screens/AddBookList";
import Login from "../Screens/Login";

import Header from "./Header";
import Wrapper from "./Wrapper";

export default () => {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/shelf" component={Shelf} />
          <Route path="/:userid/booklist/:id" component={Booklist} />
          <Route path="/:userid/shelf" component={UserShelf} />
          <Route path="/booklist/:id" component={BooklistDetail} />
          <Route path="/:userid/addbooklist" component={AddBookList} />
          <Route path="/:userid/profile" component={Profile} />
          <Route path="/:userid/editprofile" component={EditProfile} />
          <Route path="/:userid/addbook" component={AddBook} />
          <Route path="/book/:id" component={BookDetail} />

          <Redirect from="*" to="/" />
        </Switch>
      </Wrapper>
    </Router>
  );
};
