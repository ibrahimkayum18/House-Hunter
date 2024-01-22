import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useAuth = () => {
    const {
        user,
        loading,
        createUser,
        login,
        googleLogin,
        logOut,
      } = useContext(AuthContext)
    return (
        <div>
            
        </div>
    );
};

export default useAuth;