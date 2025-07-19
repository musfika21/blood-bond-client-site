import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://blood-bond-server-tau.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;