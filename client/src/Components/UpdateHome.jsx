import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHouses from "../Hooks/useHouses";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const UpdateHome = () => {
  const { id } = useParams();
  const [houses] = useHouses();
  const [room, setRoom] = useState({});
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const detailsRoom = houses.find((item) => item._id == id);
    setRoom(detailsRoom);
  }, [houses, id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const address = form.address.value;
    const city = form.city.value;
    const bedroom = form.bedrooms.value;
    const bathroom = form.bathrooms.value;
    const room_size = form.room_size.value;
    const availability_date = form.availability_date.value;
    const rent_per_month = form.rent_per_month.value;
    const phone_number = form.phone_number.value;
    const picture = form.photo.value;
    const description = form.description.value;
    const email = user.email;

    if (phone_number.length > 11 && phone_number.length < 11) {
      return toast.error("Please provide Bangladeshi Phone number");
    }

    const roomDetails = {
      name,
      email,
      address,
      city,
      bedroom,
      bathroom,
      room_size,
      availability_date,
      rent_per_month,
      phone_number,
      picture,
      description,
    };
    console.log(roomDetails);

    axiosPublic.put(`/houses/${room._id}`, roomDetails).then((res) => {
      if (res.data.acknowledged) {
        toast.success(`${room.name} Updated Successfully`);
        navigate("/dashboard/my-houses");
      }
    });
  };

  return (
    <div className="">
      <form
        onSubmit={handleUpdate}
        className="w-11/12 md:w-11/12 mx-auto space-y-4 mt-1 lg:mt-3 lg:p-5 rounded-lg"
      >
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          Update {room.name}
        </h2>
        <hr />
        <div className="md:flex justify-center items-center gap-5 space-y-5 md:space-y-0">
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">Name</label>
            <div>
              {/* <FaBusinessTime className="absolute text-primarycolor text-2xl text-gray-500"></FaBusinessTime> */}
            </div>
            <input
              type="text"
              name="name"
              defaultValue={room.name}
              placeholder="Property title..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">Address</label>
            <div>
              {/* <FaTextHeight className="absolute text-primarycolor text-2xl text-gray-500"></FaTextHeight> */}
            </div>
            <input
              type="text"
              name="address"
              defaultValue={room.address}
              placeholder="Property Location..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
        </div>
        <div className="md:flex justify-center items-center gap-5 space-y-5 md:space-y-0">
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">City</label>
            <div>
              {/* <FaUser className="absolute text-primarycolor text-2xl text-gray-500"></FaUser> */}
            </div>
            <input
              type="text"
              name="city"
              defaultValue={room.city}
              placeholder="Enter city..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">Bedrooms</label>
            <div>
              {/* <FaTextHeight className="absolute text-primarycolor text-2xl text-gray-500"></FaTextHeight> */}
            </div>
            <input
              type="text"
              name="bedrooms"
              defaultValue={room.bedrooms}
              placeholder="Number of bedrooms..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
        </div>
        <div className="md:flex justify-center items-center gap-5 space-y-5 md:space-y-0">
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">Bathrooms</label>
            <div>
              {/* <FaUser className="absolute text-primarycolor text-2xl text-gray-500"></FaUser> */}
            </div>
            <input
              type="text"
              name="bathrooms"
              defaultValue={room.bathrooms}
              placeholder="Number of bathroms..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">Room Size</label>
            <div>
              {/* <FaTextHeight className="absolute text-primarycolor text-2xl text-gray-500"></FaTextHeight> */}
            </div>
            <input
              type="text"
              name="room_size"
              defaultValue={room.room_size}
              placeholder="Enter room size..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
        </div>
        <div className="md:flex justify-center items-center gap-5 space-y-5 md:space-y-0">
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">Availability Date</label>
            <div>
              {/* <FaUser className="absolute text-primarycolor text-2xl text-gray-500"></FaUser> */}
            </div>
            <input
              type="date"
              name="availability_date"
              defaultValue={room.availability_date}
              placeholder="Number of bathroms..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">Rent Per Month</label>
            <div>
              {/* <FaTextHeight className="absolute text-primarycolor text-2xl text-gray-500"></FaTextHeight> */}
            </div>
            <input
              type="number"
              name="rent_per_month"
              defaultValue={room.rent_per_month}
              placeholder="Enter rent..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
        </div>
        <div className="md:flex justify-center items-center gap-5 space-y-5 md:space-y-0">
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">Phone Number</label>
            <div>
              {/* <FaUser className="absolute text-primarycolor text-2xl text-gray-500"></FaUser> */}
            </div>
            <input
              type="text"
              name="phone_number"
              defaultValue={room.phone_number}
              placeholder="Enter phone number..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
          <div className="md:flex flex-col md:w-1/2 relative">
            <label className="py-3">Picture URL</label>
            <div>
              {/* <FaTextHeight className="absolute text-primarycolor text-2xl text-gray-500"></FaTextHeight> */}
            </div>
            <input
              type="text"
              name="photo"
              defaultValue={room.picture}
              placeholder="Enter house photo url..."
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
            />
          </div>
        </div>
        <div className="md:flex flex-col w-full relative">
          <label className="py-3">House Description</label>
          <div>
            {/* <FaTextHeight className="absolute text-primarycolor text-2xl text-gray-500"></FaTextHeight> */}
          </div>
          <input
            type="text"
            name="description"
            defaultValue={room.description}
            placeholder="Enter house description..."
            className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg w-full"
          />
        </div>
        <button
          type="submit"
          className="font-bold bg-sky-300 w-full py-3 btn rounded-lg"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default UpdateHome;
