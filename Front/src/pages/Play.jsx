import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Play = ({ type, id }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [item, setItem] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let endpoint = "";
      if (type === "movie") {
        endpoint = `movies/${id}`;
      }

      if (type === "serie") {
        endpoint = `series/${id}`;
      }

      const response = await fetch(apiUrl + endpoint);

      const data = await response.json();
      setItem(data);
      console.log(data);
    };

    fetchData();
  }, [id, type]);
  return (
    <div className="text-white">
      <iframe className="h-115 w-full border-2 border-blue-600" src={item.trailer}></iframe>
      <button className="hover:cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        volver
      </button>
    </div>
  );
};

export default Play;
