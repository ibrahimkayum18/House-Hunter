import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useBookings from "../../../Hooks/useBookings";
import { FaTrash } from "react-icons/fa";

const RentedHouse = () => {
    const [bookings, refetch, isLoading] = useBookings()
    const {user} = useAuth()
    const [myHouses, setMyHouses] = useState([])
    useEffect(() => {
        const house = bookings.filter(item => item.owner_email == user.email)
        setMyHouses(house);
    },[user.email, bookings])
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
            {myHouses.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.bedrooms}</td>
                <td>{item.bathrooms}</td>
                <td>${item.rent_per_month}</td>
                <td>{item.owner_email}</td>
                {/* <td onClick={() => handleDelete(item._id)}>
                  <FaTrash className="text-2xl" />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default RentedHouse;