import { Card } from "@/components/Card";
import { CardSerie } from "@/components/CardSerie";
import React, { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
const MiLista = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const fetchMyList = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}user-content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);

      setMyList(data);
    };
    fetchMyList();
  }, []);

  return (
    <div className="text-white">
      <h1 className="">Mi Lista:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {myList.map((item) =>
          item.type == "movie" ? (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              director={item.director}
              category={item.category}
              duration={item.duration}
              img={item.img}
            />
          ) : (
            <CardSerie
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              img={item.img}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default MiLista;
