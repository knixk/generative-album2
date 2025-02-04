import React from "react";

import { myContext } from "../App";
import { useContext, useEffect } from "react";

function Navbar() {
  const MyState = useContext(myContext);
  const { isLoading, setIsLoading, localState, setLocalState } = MyState;

  if (isLoading) {
    return "";
  }

  const handleChange = (name, value) => {
    //  setLocalState((prev) => {...prev, [name]: [value]};
    setLocalState((prevLocalState) => ({ ...prevLocalState, [name]: value }));
  };

  useEffect(() => {
    const mainFn = () => {
      console.log("main event fired");
      const localState = localStorage.getItem("localState");
      if (localState) {
        const parsedState = JSON.parse(localState);

        handleChange("bg__img", parsedState.bg__img);
        handleChange("main__form__text", parsedState.main__form__text);
        handleChange("main__prompt", parsedState.main__prompt);
        handleChange("home__img", parsedState.home__img);
        handleChange("theme__color", parsedState.theme__color);
        handleChange("home__intro", parsedState.home__intro);
        handleChange("header__txt", parsedState.header__txt);
        handleChange("ip__address", parsedState.ip__address);
        handleChange("main__form__text1", parsedState.main__form__text1);
        handleChange("main__form__text2", parsedState.main__form__text2);
        handleChange("main__form__text3", parsedState.main__form__text3);
        handleChange("album__bg__img", parsedState.album__bg__img);

        // album__bg__img




        const navEle = document.querySelector("nav");
        navEle.style.backgroundColor = parsedState.theme__color;

        const myDoc = document.querySelector("body");
        // const homeBtn = document.querySelector(".home__btn");
        // myDoc.style.backgroundImage = `url(${parsedState.bg__img})`;
        // darker background
        myDoc.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${parsedState.bg__img})`;
        // if (homeBtn) {
        //   homeBtn.style.backgroundColor = parsedState.theme__color;
        // }
      }
    };

    mainFn();
    window.addEventListener("localStorageUpdate", mainFn);
    console.log("event listener added");
    // return () => window.removeEventListener("localStorageUpdate", mainFn);
    // console.log("listener removed");
  }, []);

  useEffect(() => {
    const homeBtn = document.querySelector(".home__btn");
    if (homeBtn) {
      homeBtn.style.backgroundColor = localState.theme__color;
    }
  }, [localState])

  return (
    <nav>
      <h2>{localState.header__txt}</h2>
    </nav>
  );
}

export default Navbar;
