import React, { useContext, useEffect, useRef } from "react";
import { myContext } from "../App";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Config() {
  const myState = useContext(myContext);
  const { setRefresh, localState, setLocalState } = myState;

  console.log(localState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalState({ ...localState, [name]: value });
    // console.log(localState)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const localState2 = {
      bg__img: localState.bg__img,
      main__form__text: localState.main__form__text,
      main__prompt: localState.main__prompt,
      home__img: localState.home__img,
      theme__color: localState.theme__color,
      home__intro: localState.home__intro,
      header__txt: localState.header__txt,
      ip__address: localState.ip__address,
      album__bg__img: localState.album__bg__img,
      main__form__text1: localState.main__form__text1,
      main__form__text2: localState.main__form__text2,
      main__form__text3: localState.main__form__text3,
    };

    console.log(localState2);

    localStorage.setItem("localState", JSON.stringify(localState2));
    // window.dispatchEvent(new Event("localStorageUpdate"));
    // socket.emit("updateLocalStorage", localState2);

    toast.success("Form was submitted..");
    // setRefresh((prev) => !prev);
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

  return (
    <div className="config__container">
      <Toaster />
      <form onSubmit={handleSubmit} className="config__form">
        <label htmlFor="ip__address">IP Address: </label>
        <input
          value={localState.ip__address}
          id="ip__address"
          name="ip__address"
          onChange={handleChange}
          placeholder="Enter ip address.."
          type="url"
          required
        />
        <label htmlFor="bg__img">Background Image: </label>

        <input
          value={localState.bg__img}
          name="bg__img"
          id="bg__img"
          onChange={handleChange}
          placeholder="Enter background image url.."
          type="url"
          required
        />

        <label htmlFor="album__bg__img">Album Background Image: </label>

        <input
          value={localState.album__bg__img}
          name="album__bg__img"
          id="album__bg__img"
          onChange={handleChange}
          placeholder="Enter background image url.."
          type="url"
          required
        />

        <label htmlFor="header__txt">Header text: </label>

        <input
          value={localState.header__txt}
          name="header__txt"
          onChange={handleChange}
          placeholder="Enter header text.."
          type="text"
          required
        />

        <label htmlFor="home__img">Home page intro image: </label>

        <input
          value={localState.home__img}
          name="home__img"
          onChange={handleChange}
          placeholder="Home screen first image.."
          type="url"
          required
        />

        <label htmlFor="home__intro">Home page intro text: </label>

        <input
          value={localState.home__intro}
          name="home__intro"
          onChange={handleChange}
          placeholder="Home screen intro.."
          type="text"
          required
        />

        <label htmlFor="bg__img">Theme color: </label>

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

        <label htmlFor="main__form__text1">Main label 1 text: </label>

        <input
          value={localState.main__form__text1}
          name="main__form__text1"
          onChange={handleChange}
          placeholder="Enter main label 1 text.."
          type="text"
          required
        />

        <label htmlFor="main__form__text2">Main label 2 text: </label>

        <input
          value={localState.main__form__text2}
          name="main__form__text2"
          onChange={handleChange}
          placeholder="Enter main label 2 text.."
          type="text"
          required
        />

        <label htmlFor="main__form__text3">Main label 3 text: </label>

        <input
          value={localState.main__form__text3}
          name="main__form__text3"
          onChange={handleChange}
          placeholder="Enter main label 3 text.."
          type="text"
          required
        />

        <label htmlFor="bg__img">Actual prompt for AI : </label>

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
