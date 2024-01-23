import { Link } from "react-router-dom";
import useHouses from "../../Hooks/useHouses";

const RentalSection = () => {
  const [houses, refetch] = useHouses();
  return (
    <div className="w-11/12 mx-auto mt-10">
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
              </div>
              <Link to={`details/${item._id}`}>
                <button className="text-blue-600 underline">See More...</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalSection;
