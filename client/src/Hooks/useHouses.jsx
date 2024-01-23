import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useHouses = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const { refetch, data: houses = [], isLoading } = useQuery({
        queryKey: ['houses', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/houses`)
            return res.data;
        }
    })

    return [houses, refetch, isLoading]
};

export default useHouses;