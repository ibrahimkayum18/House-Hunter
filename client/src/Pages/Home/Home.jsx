import { Helmet } from "react-helmet";
import BannerHome from "./BannerHome";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import RentalSection from "./RentalSection";

const Home = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate()
  const handleLogOut = () => {
    logOut()
    .then(() => {
            toast.success('Log Out Successfull')
            navigate('/')
    })
  }
  return (
    <div>
      <Helmet>
        <title>Home | House Hunter</title>
      </Helmet>
      <div className="md:flex justify-between p-5 bg-zinc-800 text-white">
        <h2 className="sm:text-sm md:text-xl lg:text-2xl text-center lg:text-left">
          Find homes for rent with{" "}
          <span className="text-orange-600 font-bold"> 20% </span> discount
        </h2>
        <div className="flex gap-4 underline justify-center items-center">
        <Link to={"dashboard"}>Dashboard</Link>
          {!user ? (
            <>
              <Link to={"/login"}>Log In</Link>
              <Link to={"/register"}>Register</Link>
            </>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className=" m-1">
                  Profile
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-zinc-800 rounded-box w-52"
                >
                  <li>
                    <a>{user.displayName}</a>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </ul>
              </div>
            </>
          )}
          
        </div>
      </div>
      <BannerHome />
      <RentalSection />
    </div>
  );
};

export default Home;
