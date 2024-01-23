import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAuth = () => {
  const { user, loading, createUser, login, googleLogin, logOut } =
    useContext(AuthContext);
  return {
    user,
    loading,
    createUser,
    login,
    googleLogin,
    logOut,
  };
};

export default useAuth;
