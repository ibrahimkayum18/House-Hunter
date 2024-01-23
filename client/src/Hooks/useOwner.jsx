import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useUsers from "./useUsers";


const useOwner = () => {
    const [isOwner, setIsOwner] = useState(false)
    const {user} = useAuth();
    const [users,] = useUsers();
    useEffect(() => {
      const isUser = users.find(item => item.email == user.email)
      if(isUser){
        setIsOwner(true)
      }
    },[users, user.email])
    return isOwner;
};

export default useOwner;