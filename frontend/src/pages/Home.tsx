import React, { useEffect, useState } from "react";
import { api } from "../api";

const Home: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/ping")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Ошибка API:", error));
  }, []);

  return (
    <div>
      <h1>React + Laravel API</h1>
      <p>{message || "Загрузка..."}</p>
    </div>
  );
};

export default Home;
