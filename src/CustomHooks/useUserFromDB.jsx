import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useUserFromDB = (email) => {
    const { user, setUser, loading, setLoading } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!email) return;

        const fetchUser = async () => {
            try {
                setLoading(true);
                // setError(null);

                const { data } = await axios.get(`http://localhost:3000/donors/${email}`);
                console.log("Fetched user:", data);

                setUser(data); // assuming data is the user object directly
            } catch (err) {
                console.error("Error fetching user:", err);
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [email, setLoading, setUser]);

    const donor = user; // or adjust based on your API response

    return { donor, loading, error };
};

export default useUserFromDB;
