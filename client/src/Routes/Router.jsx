import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/Dashboard";
import OwnerPanel from "../Pages/Panels/OwnerPanel/OwnerPanel";
import AddHouse from "../Pages/Panels/OwnerPanel/AddHouse";
import MyHouses from "../Pages/Panels/OwnerPanel/MyHouses";
import UpdateHome from "../Components/UpdateHome";
import Details from "../Components/Details";
import Bookings from "../Pages/Panels/RentarPanel/Bookings";
import RentedHouse from "../Pages/Panels/OwnerPanel/RentedHouse";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path:'dashboard',
    element:<Dashboard />,
    children: [
      {
        path:'owner-profile',
        element:<OwnerPanel />
      },
      {
        path:'add-house',
        element:<AddHouse />
      },
      {
        path:'rented-houses',
        element:<RentedHouse />
      },
      {
        path: 'my-houses',
        element:<MyHouses />
      },
      
      {
        path:`update/:id`,
        element:<UpdateHome />
      },
      {
        path:'bookings',
        element:<Bookings />
      }
    ]
  },
  {
    path:'details/:id',
    element:<Details />
  },
  {path:'/login', element:<LogIn />},
  {path:"/register", element:<Register />}
]);

export default Router;
