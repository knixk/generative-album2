import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Home from "./pages/Home";
import Album from "./pages/Album";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";

export const myContext = createContext();

function App() {
  const [formData, setFormData] = useState();
  const [lastGeneratedImg, setLastGeneratedImg] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(false);

  return (
    <Router>
      {/* <myContext.Provider
        value={
          (formData,
          setFormData,
          lastGeneratedImg,
          setLastGeneratedImg,
          submitDisabled,
          setSubmitDisabled)
        }
      > */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/album" element={<Album />}></Route>
          <Route path="/main" element={<Main />}></Route>
        </Routes>
      {/* </myContext.Provider> */}
    </Router>
  );
}

export default App;
