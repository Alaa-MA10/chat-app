import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// create custom-context
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

// manage user-data
export const AuthProvider = ({ children }) => {
  // The useState hook initially sets (the loading to true-boolean) and (user to null)
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // when user state change, get user-data from firebase
    auth.onAuthStateChanged((user) => {
      // setting user-data and loading to false
      setUser(user);
      setLoading(false);
      // if only have a user, then navigate to chat-app
      if (user) navigate("/chats");
    });
  }, [user, navigate]);

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {/* show children-component if not loading */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
