import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "../config";
import { setAllReview } from "../redux/reviewSlice";
import axios from "axios";

const useGetAllReviews = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/review/allReview`, { withCredentials: true });
                console.log("fetched reviews:", result.data);
                dispatch(setAllReview(result.data));
            } catch (error) {
                console.error("Failed to fetch all reviews:", error?.response?.data || error.message || error);
            }
        };

        fetchAll();
    }, [dispatch]);
};

export default useGetAllReviews;