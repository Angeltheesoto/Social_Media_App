import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// This stores the user so when we refresh we don't have login again and again.
// const INITIAL_STATE = {
//   user: {
//     _id: "63e29b38276597f246e22c07",
//     username: "test3",
//     email: "test3@gmail.com",
//     profilePicture: "person/1.jpeg",
//     coverPicture: "",
//     isAdmin: false,
//     followers: [],
//     following: [],
//   },
//   isFetching: false,
//   error: false,
// };
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
