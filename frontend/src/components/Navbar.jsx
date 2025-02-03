import React from "react";

import { myContext } from "../App";
import { useContext, useEffect } from "react";

// console.log(window.location.pathname)

function Navbar() {
  const MyState = useContext(myContext);
  const { isLoading, setIsLoading, localState, setLocalState } = MyState;

  // console.log(MyState)

  if (isLoading) {
    return "";
  }

  const handleChange = (name, value) => {
    //  setLocalState((prev) => {...prev, [name]: [value]};
    setLocalState((prevLocalState) => ({ ...prevLocalState, [name]: value }));
  };

  // const setLocalStorageState = () => {

  // }

  useEffect(() => {
    const setBg = (img) => {
      // backgroundImg && setBackground(backgroundImg);
      // console.log("img was updated")
      // const bg__img = localStorage.getItem("bg__img");
      // console.log(bg__img);
      // if (bg__img) {
      // setBackground(bg__img)

      // console.log(myDoc);
      console.log("image set");
      // setRefresh((prev) => !prev);
      // }
    };

    const mainFn = () => {
      const localState = localStorage.getItem("localState");
      if (localState) {
        const parsedState = JSON.parse(localState);

        handleChange("bg__img", parsedState.bg__img);
        handleChange("main__form__text", parsedState.main__form__text);
        handleChange("main__prompt", parsedState.main__prompt);
        handleChange("home__img", parsedState.home__img);
        handleChange("theme__color", parsedState.theme__color);
        handleChange("home__intro", parsedState.home__intro);

        // console.log(localState);
        // const prsedLocalState = JSON.parse(localState);
        // console.log(prsedLocalState);

        const navEle = document.querySelector("nav");
        // console.log(navEle);
        navEle.style.backgroundColor = parsedState.theme__color;

        const myDoc = document.querySelector("body");
        myDoc.style.backgroundImage = `url(${parsedState.bg__img})`;

        // console.log(localState)
        // setBg(parsedState.bg__img);
      }
    };

    mainFn();
    window.addEventListener("localStorageUpdate", mainFn);
    console.log("event listener added");
    return () => window.removeEventListener("localStorageUpdate", mainFn);
    console.log("listener removed");
  }, []);

  useEffect(() => {}, []);

  return (
    <nav>
      <h2>Indroyd Labs Demo</h2>
    </nav>
  );
}

export default Navbar;
