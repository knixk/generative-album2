import React from "react";
import { useNavigate } from "react-router-dom";


const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home__container">
      <img className="home__img" src={sampleImg} alt="" />
      <h2>Welcome to our Generative Album</h2>
      <button onClick={() => navigate("/main")}>Get started</button>
    </div>
  );
}

export default Home;
