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
  const [configData, setConfigData] = useState({})

  return (
    <Router>
      <myContext.Provider
        value={{
          formData,
          setFormData,
          lastGeneratedImg,
          setLastGeneratedImg,
          submitDisabled,
          setSubmitDisabled,
          img,
          setImg,
          isLoading,
          setIsLoading,
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
