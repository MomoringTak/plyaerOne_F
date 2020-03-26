import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Home from "../Screens/Home";
import Books from "../Screens/Books";
import Profile from "../Screens/Profile";
import BookDetail from "../Screens/BookDetail";
import BooklistDetail from "../Screens/BooklistDetail";
import Shelf from "../Screens/Shelf";
import UserShelf from "../Screens/UserShelf";
import EditProfile from "../Screens/EditProfile";
import AddBook from "../Screens/AddBook";
import AddBookList from "../Screens/AddBookList";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import AddGoogleUserInfo from "../Screens/AddGoogleUserInfo";
import Search from "../Screens/Search";

import Header from "./Header";
import Wrapper from "./Wrapper";

export default () => {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/books" exact component={Books} />
          <Route path="/login" exact component={Login} />
          <Route path="/singup" exact component={SignUp} />
          <Route path="/shelf" component={Shelf} />
          <Route path="/:userEmail/shelf" component={UserShelf} />
          <Route path="/booklist/:id" component={BooklistDetail} />
          <Route path="/:userEmail/addbooklist" component={AddBookList} />
          <Route path="/:userEmail/profile" component={Profile} />
          <Route path="/:userEmail/editprofile" component={EditProfile} />
          <Route path="/addbook" component={AddBook} />
          <Route path="/book/:id" component={BookDetail} />
          <Route paht="/addtionalInfo" component={AddGoogleUserInfo} />
          <Redirect from="*" to="/" />
        </Switch>
      </Wrapper>
    </Router>
  );
};
