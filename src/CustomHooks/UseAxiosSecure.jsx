// import axios from 'axios';
// import { useNavigate } from 'react-router';
// import { getIdToken } from 'firebase/auth';
// import useAuth from './useAuth';

// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:3000',
// });

// const useAxiosSecure = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     axiosSecure.interceptors.request.use(
//         async (config) => {
//             if (user) {
//                 const token = await getIdToken(user, true);
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//             return config;
//         },
//         (error) => Promise.reject(error)
//     );

//     axiosSecure.interceptors.response.use(
//         (res) => res,
//         async (error) => {
//             const status = error.response?.status;
//             if (status === 401 || status === 403) {
//                 if (status === 401) {
//                     await logout();
//                     navigate('/login');
//                 } else {
//                     navigate('/forbidden');
//                 }
//             }
//             return Promise.reject(error);
//         }
//     );

//     return axiosSecure;
// };

// export default useAxiosSecure;