import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useUsers from "../../../Hooks/useUsers";


const OwnerPanel = () => {
    const [validUser, setValidUser] = useState([]);
    const {user} = useAuth()
    const [users, refetch] = useUsers()
    console.log(validUser);

    useState(() => {
        const findUser = users.find(item => item.email === user.email)
        setValidUser(findUser)
    },[])
    
    return (
        <div>
            <h2>Owner Name: </h2>
        </div>
    );
};

export default OwnerPanel;