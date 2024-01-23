import { LuMenuSquare } from "react-icons/lu";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useUsers from "../Hooks/useUsers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Dashboard = () => {
  const [isOwner, setIsOwner] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate()
  const [users, refetch, loading ] = useUsers();
  const axiosPublic = useAxiosPublic()
  
  console.log(users);
  useEffect(() => {
    axiosPublic.get('/users')
    .then(res => {
      if(res.data){
        const isUser = res.data.find((item) => item.email == user.email);
    setIsOwner(isUser.role);
      }
    })
    
  }, [users, user.email, axiosPublic]);
  console.log(isOwner.role);

  const handleLogOut = () => {
    logOut()
    .then(() => {
            toast.success('Log Out Successfull')
            navigate('/')
    })
  }

  const navLinks = (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <img
          className="h-16 w-16 rounded-full"
          src="https://i.ibb.co/VYrYfPY/images-1.jpg"
          alt=""
        />
        <h2 className="text-3xl font-bold">ReportSafe</h2>
      </div>
      {isOwner == "owner" ? (
        <>
          <li>
            <NavLink to={"/dashboard/owner-profile"}>
              <span className="">
                <FaHome />
              </span>{" "}
              Owner Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/add-house"}>
              <span className="">
                <FaHome />
              </span>{" "}
              Add House
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/my-houses"}>
              <span className="">
                <FaHome />
              </span>{" "}
              My Houses
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/rented-houses"}>
              <span className="">
                <FaHome />
              </span>{" "}
              Rented Houses
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to={"/dashboard/bookings"}>
              <span className="">
                <FaHome />
              </span>{" "}
              Bookings
            </NavLink>
          </li>
        </>
      )}

      <div className="divider"></div>

      <li>
        <NavLink to={"/"}>
          <span className="">
            <FaHome />
          </span>{" "}
          Home
        </NavLink>
      </li>
      <li>
        <button onClick={handleLogOut}>
        <span className="">
                <FaHome />
              </span>{" "}
          Log Out
        </button>
      </li>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="drawer lg:drawer-open lg:w-80 z-20">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex p-5 items-center justify-end">
          <div>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <LuMenuSquare />
            </label>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {navLinks}
          </ul>
        </div>
      </div>
      <div className="w-full flex-1 z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
