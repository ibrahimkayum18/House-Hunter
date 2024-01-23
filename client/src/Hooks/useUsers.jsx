import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const { refetch, data: users = [], isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/users`)
            return res.data;
        }
    })

    return [users, refetch, isLoading]
};

export default useUsers;