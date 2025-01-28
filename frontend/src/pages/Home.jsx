import React from "react";
import { useNavigate } from "react-router-dom";
import istanbul from "../assets/istanbul.jpg"

// const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;
const sampleImg2 = `https://img.freepik.com/premium-photo/picture-forest-with-tree-background_198067-945359.jpg`
const sampleImg3 = `https://i.pinimg.com/736x/39/4d/68/394d68ba91ee4f49d400034d8d487997.jpg`
function Home() {
  const navigate = useNavigate();

  return (
    <div className="home__container">
      <img className="home__img" src={istanbul} alt="" />
      <h2>Welcome to our Generative Album</h2>
      <button onClick={() => navigate("/main")}>Get started</button>
    </div>
  );
}

export default Home;
