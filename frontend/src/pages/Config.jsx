import React, { useContext, useEffect, useRef } from "react";
import { myContext } from "../App";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// import
// import defineConfig from '../../vite.config';

function Config() {
  const myState = useContext(myContext);
  const {
    configData,
    setConfigData,
    prompt,
    setPrompt,
    introText,
    setIntroText,
    refresh,
    setRefresh,
    backgroundImage,
    setBackgroundImage,
    localState,
    setLocalState,
  } = myState;
  console.log(localState);
  const bodyRef = useRef(null);

  // console.log(myState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setConfigData({ ...configData, [name]: value });
    setLocalState({ ...localState, [name]: value });
    console.log(localState)

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    // console.log(configData);

    setPrompt(configData.main__prompt);
    setIntroText(configData.main__form__text);
    // console.log(configData.main__form__text);

    const myDoc = document.querySelector("body");
    myDoc.style.backgroundImage = `url(${configData.bg__url})`;
    setBackgroundImage(configData.bg__url);
    localStorage.setItem("bg__img", configData.bg__url);

    const myData = JSON.stringify(configData);
    // console.log(myData)

    localStorage.setItem("config__data", myData);
    // console.log("localStorage was set")

    const localState2 = {
      bg__img: localState.bg__url,
      main__form__text: localState.main__form__text,
      main__prompt: localState.main__prompt,
      home__img: localState.home__image,
      theme__color: localState.theme__color,
      home__intro: localState.home__intro,
    };

    console.log(localState2)

    localStorage.setItem("localState", JSON.stringify(localState2));
    window.dispatchEvent(new Event("localStorageUpdate"));

    // console.log(localState, "im local State")

    // store this image somehow
    // console.log(myDoc);

    // ------ clear the form
    // setConfigData({})
    toast.success("Form was submitted..");
    setRefresh((prev) => !prev);
  };

  const deleteOldImages = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5051/delete-old-images"
      );
      console.log("Deleted images:", response.data.deleted);
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  useEffect(() => {
    // console.log(introText);
  }, []);



  return (
    <div className="config__container">
      <Toaster />
      <form onSubmit={handleSubmit} className="config__form">
        {/* <input
          value={configData.max__number}
          name="max__number"
          onChange={handleChange}
          placeholder="Maximum number of images on canvas.."
          type="number"
          required
        /> */}
        <input
          value={localState.bg__img}
          name="bg__img"
          onChange={handleChange}
          placeholder="Enter background image url.."
          type="url"
          required
        />

        <input
          value={localState.home__img}
          name="home__img"
          onChange={handleChange}
          placeholder="Home screen first image.."
          type="url"
          required
        />

        <input
          value={localState.home__intro}
          name="home__intro"
          onChange={handleChange}
          placeholder="Home screen intro.."
          type="text"
          required
        />

        <label className="color__label" htmlFor="theme__color">
          <input
            value={localState.theme__color}
            name="theme__color"
            id="theme__color"
            onChange={handleChange}
            placeholder="theme color in hex (with the #).."
            type="color"
            required
          />
          {/* Select the theme color: */}
          <input
            type="text"
            value={localState.theme__color}
            placeholder="Select the theme color.."
            // disabled
            onChange={(e) => {}}
          />
        </label>

        <input
          value={localState.main__form__text}
          name="main__form__text"
          onChange={handleChange}
          placeholder="Enter main form text.."
          type="text"
          required
        />
        <input
          value={localState.main__prompt}
          name="main__prompt"
          onChange={handleChange}
          placeholder="Enter main form prompt for image description.."
          type="text"
          required
        />

        <button className="submit">Submit</button>

        <button
          onClick={async () => {
            localStorage.clear("images");
            // toast.success("All images cleared...");
            await deleteOldImages();
            setRefresh((prev) => !prev);
            // console.log(setRefresh);
          }}
          id="cache__btn"
        >
          Clear last 5 images
        </button>
      </form>
    </div>
  );
}

export default Config;
