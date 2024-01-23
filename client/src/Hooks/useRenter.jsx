import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useUsers from "./useUsers";


const useRenter = () => {
    const [isRenter, setIsRenter] = useState(false)
    const {user} = useAuth();
    const [users,] = useUsers();
    useEffect(() => {
      const isUser = users.find(item => item.email == user.email)
      if(isUser){
        setIsRenter(true)
      }
    },[users, user.email])
    if(isRenter.role == 'renter'){
       return isRenter; 
    }
    
};

export default useRenter;