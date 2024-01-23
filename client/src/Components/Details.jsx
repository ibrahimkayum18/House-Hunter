import { Link, useNavigate, useParams } from "react-router-dom";
import useHouses from "../Hooks/useHouses";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FaBusinessTime, FaUser, FaVoicemail } from "react-icons/fa";

const Details = () => {
  const { id } = useParams();
  const [houses] = useHouses();
  const { user } = useAuth();
  const [room, setRoom] = useState({});
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  useEffect(() => {
    const detailsRoom = houses.find((item) => item._id == id);
    setRoom(detailsRoom);
  }, [houses, id]);

  const handleBooking = (e) => {
    e.preventDefault();
    const my_phone_number = e.target?.my_phone_number?.value;
    console.log(my_phone_number);
    // const my_phone_number = e.target.my_phone_number.value;
    const roomDetails = {
      name: room.name,
      owner_email: room.email,
      email: user.email,
      address: room.address,
      city: room.city,
      bedrooms: room.bedrooms,
      bathrooms: room.bathrooms,
      room_size: room.room_size,
      availability_date: room.availability_date,
      rent_per_month: room.rent_per_month,
      phone_number: room.phone_number,
      my_phone_number,

      picture: room.picture,
      description: room.description,
    };
    console.log(roomDetails);
    axiosPublic.post("/bookings", roomDetails).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Booked!",
          text: "This hose has been Booked.",
          icon: "success",
        });
        navigate("/dashboard/bookings");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-5 pt-10 items-center">
      <div className="col-span-2">
        <img src={room.picture} alt="" className="w-full h-auto" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl lg:text-4xl">{room.name}</h2>
        <p>
          <span className="font-bold">Bedroom:</span> {room.bedrooms}
        </p>
        <p>
          <span className="font-bold">Bathrooms:</span> {room.bathrooms}
        </p>
        <p>
          <span className="font-bold">Room Size: </span> {room.room_size}{" "}
        </p>
        <h2>
          <span className="font-bold">Address: </span> {room.address}
        </h2>
        <p>
          <span className="font-bold">City: </span> {room.city}
        </p>
        <p>
          <span className="font-bold">Phone Number:</span> {room.phone_number}
        </p>
        <p>
          <span className="font-bold">Rent Per Month:</span> $
          {room.rent_per_month}
        </p>
        <p>
          <span className="font-bold">Availability Date:</span>{" "}
          {room.availability_date}
        </p>
        <div>
          {room.email == user.email ? (
            <>
              <Link to={`/dashboard/update/${room._id}`}>
                <button className="btn btn-primary">Update Now</button>
              </Link>
            </>
          ) : (
            <li>
              <button
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
                className="btn btn-primary"
              >
                Book this property for ${room.rent_per_month}
              </button>
            </li>
          )}
        </div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Hello!</h3>
            <h3 className="font-bold text-lg">
              Rent {room.name} for ${room.rent_per_month}
            </h3>
            <form onSubmit={handleBooking}>
              <div className="md:flex flex-col w-full relative">
                <label className="py-3">Name</label>
                <div>
                  <FaUser className="absolute text-primarycolor text-2xl text-gray-500"></FaUser>
                </div>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.displayName}
                  placeholder="Property title..."
                  className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
                />
              </div>
              <div className="md:flex flex-col w-full relative">
                <label className="py-3">Email</label>
                <div>
                  <FaVoicemail className="absolute text-primarycolor text-2xl text-gray-500"></FaVoicemail>
                </div>
                <input
                  type="text"
                  name="email"
                  defaultValue={user.email}
                  placeholder="Enter Email..."
                  className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
                />
              </div>
              <div className="md:flex flex-col w-full relative">
                <label className="py-3">Phone Number</label>
                <div>
                  <FaVoicemail className="absolute text-primarycolor text-2xl text-gray-500"></FaVoicemail>
                </div>
                <input
                  type="text"
                  name="my_phone_number"
                  placeholder="Phone Number..."
                  className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
                />
              </div>
              <div className="flex justify-center items-center gap-5">
              <div className="text-center mt-5">
                <button type="submit" className="btn btn-primary">
                  Book
                </button>
              </div>
              <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
              </div>
            </form>
           
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Details;
