import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import istanbul from "../assets/istanbul.jpg";
import { myContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
// const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;
// const sampleImg2 = `https://img.freepik.com/premium-photo/picture-forest-with-tree-background_198067-945359.jpg`;
// const sampleImg3 = `https://i.pinimg.com/736x/39/4d/68/394d68ba91ee4f49d400034d8d487997.jpg`;
function Home() {
  const navigate = useNavigate();

  const myState = useContext(myContext);
  const { localState, setLocalState } = myState;

  // if (localState.home__img) {
    console.log(localState);
  // } else {
    // toast("go to /config page to set up the app..");
  }



  return (
    <div className="home__container">
      <Toaster/>
      <img className="home__img" src={localState.home__img} alt="" />
      <h2>{localState.home__intro}</h2>
      <button onClick={() => navigate("/main")}>Get started</button>
    </div>
  );
}

export default Home;
