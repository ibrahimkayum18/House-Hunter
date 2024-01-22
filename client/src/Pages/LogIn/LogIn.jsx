import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const Login = () => {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState([])
  const { login, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    setEmail(email)

    login(email, password)
      .then((res) => {
        setUser(res.data)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Log In Successfull",
          showConfirmButton: false,
          timer: 2000
        });
        navigate(location?.state ? location.state : '/')
        
      })
      .catch((error) => console.log(error));
  };

  return (
    <div  data-aos="fade-up" className="flex items-center justify-center bg-sky-200 py-10">
      <Helmet>
        <title>Log In | Grandeur Home</title>
      </Helmet>
      <div className="w-full  flex justify-center items-center">
        <div className="p-5 md:p-10 rounded-lg w-7/12 mx-auto bg-base-100">
          <h2 className="text-3xl md:text-4xl font-bold text-center pb-8">
            Log In Now
          </h2>
          <form onSubmit={handleLogIn}>
            <div className="form-control ">
              <label>
                <span className="text-xl font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered my-2"
                placeholder="Type Email..."
              />
            </div>
            <div className="form-control">
              <label>
                <span className="text-xl font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered my-2"
                placeholder="Type Password..."
              />
            </div>
            <div className="my-5">
              <button type="submit" className="py-3 w-full bg-blue-700 text-white hover:bg-blue-500 rounded-lg">
                Sign In
              </button>
            </div>
          </form>
          <p>
            new to Job Hub?{" "}
            <Link
              to={"/register"}
              className="text-blue-600 hover:underline font-bold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className=" w-3/4 lg:pr-14">
        <img
          className="w-full p-5"
          src="https://i.ibb.co/6HS80CK/istockphoto-1312423123-612x612.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;