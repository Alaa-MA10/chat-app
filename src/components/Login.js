import React from "react";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import firebase from "firebase/compat/app";

import { auth } from "../firebase";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Chat App!</h2>
        <br />
        <br />
        {/* Google auth provider */}
        <div
          className="login-button google"
          onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
        >
          <GoogleOutlined />
          &nbsp;&nbsp; Sign In with Google
        </div>
        <br />
        {/* Facebook auth provider */}
        <div
          className="login-button facebook"
          onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
        >
          <FacebookFilled />
          &nbsp;&nbsp; Sign In with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
