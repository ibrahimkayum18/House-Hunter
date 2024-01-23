import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useBookings = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const { refetch, data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/bookings`)
            return res.data;
        }
    })

    return [bookings, refetch, isLoading]

};

export default useBookings;