import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "563473472310-ih69dhvqsbl37b20ic312v96nqlvfjr9.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        });
    });
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div> Not Sure if we are singed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I am Signed In!</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  }

  render() {
    return <div>{this.renderAuthButton()}Google Auth</div>;
  }
}
