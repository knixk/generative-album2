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
  const [img, setImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [configData, setConfigData] = useState({});

  const [name, setName] = useState();
  const [prompt, setPrompt] = useState();
  // ---- send this img to backend socket
  const [disabled, setDisabled] = useState(false);
  const [model, setModel] = useState(null);
  const [ipAddress, setIPAddress] = useState("http://192.168.0.105:3000/");
  const [introText, setIntroText] = useState();

  return (
    <Router>
      <myContext.Provider
        value={{
          introText,
          setIntroText,
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
          ipAddress,
          setIPAddress,
          lastGeneratedImg,
          setLastGeneratedImg,
          submitDisabled,
          setSubmitDisabled,
          img,
          setImg,
          isLoading,
          setIsLoading,
          configData,
          setConfigData,
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
