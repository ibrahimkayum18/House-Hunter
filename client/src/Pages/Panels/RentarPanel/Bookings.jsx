import { useEffect, useState } from "react";
import useBookings from "../../../Hooks/useBookings";
import useAuth from "../../../Hooks/useAuth";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Bookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const { user } = useAuth();
  const [bookings, refetch, isLoading] = useBookings();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const book = bookings.filter((item) => item.email == user.email);
    setMyBookings(book);
  }, [bookings, user.email]);

  if(isLoading){
    return <h2>Loading...</h2>
  }
  

  const handleDelete = (id) => {
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
        axiosPublic.delete(`/bookings/${id}`).then((res) => {
          if (res.data.acknowledged) {
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
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>House Name</th>
              <th>Address</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Rent Per Month</th>
              <th>Owner Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myBookings.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.bedrooms}</td>
                <td>{item.bathrooms}</td>
                <td>${item.rent_per_month}</td>
                <td>{item.owner_email}</td>
                <td onClick={() => handleDelete(item._id)}>
                  <FaTrash className="text-2xl" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
