import { useState, useEffect } from "react";
import axios from "axios";
// Constants
import { API } from "../constants";

const useSearchAddress = address => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API.endpoints.addressSearch}`);

        setLoading(false);
        setData(data);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    data,
    error
  };
};

export default useSearchAddress;
