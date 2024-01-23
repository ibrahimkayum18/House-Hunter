import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useHouses from "../../../Hooks/useHouses";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MyHouses = () => {
  const [myHouses, setMyHouses] = useState();
  const [houses, refetch, isLoading] = useHouses();
  const axiosPublic = useAxiosPublic();
  console.log(houses);
  const { user } = useAuth();
  useEffect(() => {
    const filter = houses.filter((item) => item.email == user.email);
    setMyHouses(filter.length);
  }, [houses, user.email]);
  if(isLoading){
    return <h2>Loading...</h2>
  }

  const handleDelate = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/houses/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-gray-100 psb-5 lg:pb-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold px-5 lg:pt-5">
        My Addeded Houses
      </h2>
      <div className="divider"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
        {houses.map((item) => (
          <div key={item._id} className="bg-white rounded-md">
            <img
              src={item.picture}
              alt=""
              className="h-52 w-full rounded-t-md"
            />
            <div className="px-5 py-2">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <h2>Address: {item.address}</h2>
              <h2>City: {item.city}</h2>
              <div className="flex justify-between items-center">
                <p>Rent: ${item.rent_per_month}</p>
                <div>
                  <Link to={`/dashboard/update/${item._id}`}>
                    {" "}
                    <button className="text-2xl">
                      <FaPenToSquare />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelate(item._id)}
                    className="text-2xl ml-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <Link to={`/details/${item._id}`}>
                <button className="text-blue-600 underline">See More...</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHouses;
