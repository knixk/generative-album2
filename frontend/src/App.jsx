import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Home from "./pages/Home";
import Album from "./pages/Album";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Config from "./pages/Config";

export const myContext = createContext();

function App() {
  const [formData, setFormData] = useState();
  const [lastGeneratedImg, setLastGeneratedImg] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState();
  const [prompt, setPrompt] = useState();
  // ---- send this img to backend socket
  const [disabled, setDisabled] = useState(false);
  const [model, setModel] = useState(null);
  const [img, setImg] = useState();
  const [localState, setLocalState] = useState({
    // home__img: "",
    // home__intro: "",
    // theme__color: "",
    // main__form__text: "",
    // main__prompt: "",
  });

  const [labelVals, setLabelVals] = useState({});
  // const 

  return (
    <Router>
      <myContext.Provider
        value={{
          formData,
          name,
          setName,
          setFormData,
          prompt,
          setPrompt,
          disabled,
          setDisabled,
          model,
          setModel,
          lastGeneratedImg,
          setLastGeneratedImg,
          submitDisabled,
          setSubmitDisabled,
          isLoading,
          setIsLoading,
          localState,
          setLocalState,
          img,
          setImg,
          labelVals, setLabelVals
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/album" element={<Album />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/config" element={<Config />}></Route>
        </Routes>
      </myContext.Provider>
    </Router>
  );
}

export default App;
