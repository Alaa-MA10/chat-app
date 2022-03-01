import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";

import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Logout user
  const logoutHandler = async () => {
    await auth.signOut();
    navigate("/");
  };

  // handle images
  const getImage = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    // if there no User
    if (!user) {
      navigate("/");
      return;
    }

    // if have user, making call to chat-engine
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        // prepare user-data to create new-user
        let user_data = new FormData();

        user_data.append("email", user.email);
        user_data.append("username", user.email);
        user_data.append("secret", user.uid);

        getImage(user.photoURL).then((avatar) => {
          user_data.append("avatar", avatar, avatar.name);

          // create user from prepared data
          axios
            .post("https://api.chatengine.io/users/", user_data, {
              headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY },
            })
            // if user creation successful
            .then(() => setLoading(false))
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }, [user, navigate]);

  // if no user or loading is true, then show the loader
  if (!user || loading) return <div className="loader"></div>;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chat App</div>
        <div className="logout-tab" onClick={logoutHandler}>
          Logout
        </div>
      </div>
      {/* Setting up the chat engine */}
      <ChatEngine
        height="calc(100vh - 60px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
