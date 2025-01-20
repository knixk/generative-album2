import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home__container">
      <h2>Welcome to our Generative Album</h2>
      <button onClick={() => navigate("/main")}>Get started</button>
    </div>
  );
}

export default Home;
