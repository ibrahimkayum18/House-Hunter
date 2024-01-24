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
        <div className="text-center pt-20">
            <h2 className="text-3xl lg:text-6xl p-5"> {user.displayName} </h2>
            <p className="text-2xl lg:text-4xl">Role: House Owner</p>
        </div>
    );
};

export default OwnerPanel;