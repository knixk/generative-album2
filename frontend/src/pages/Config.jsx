import React, { useContext, useEffect, useRef } from "react";
import { myContext } from "../App";
import axios from "axios"
// import createa

function Config() {
  const myState = useContext(myContext);
  const {
    configData,
    setConfigData,
    prompt,
    setPrompt,
    introText,
    setIntroText,
  } = myState;

  const bodyRef = useRef(null);

  console.log(myState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfigData({ ...configData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(configData);

    setPrompt(configData.main__prompt);
    setIntroText(configData.main__form__text)
    console.log(configData.main__form__text)


    const myDoc = document.querySelector("body");
    myDoc.style.backgroundImage = `url(${configData.bg__url})`;

    // store this image somehow
    // console.log(myDoc);

    // ------ clear the form
    // setConfigData({})
  };

  const deleteOldImages = async () => {
    try {
      const response = await axios.delete("http://localhost:5051/delete-old-images");
      console.log("Deleted images:", response.data.deleted);
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  useEffect(() => {
    console.log(introText)
  }, []);


  return (
    <div className="config__container">
      <form onSubmit={handleSubmit} className="config__form">
        <input
          value={configData.max__number}
          name="max__number"
          onChange={handleChange}
          placeholder="Maximum number of images on canvas.."
          type="number"
          required
        />
        <input
          value={configData.bg__url}
          name="bg__url"
          onChange={handleChange}
          placeholder="Enter background image url.."
          type="url"
          required
        />
        <input
          value={configData.main__form__text}
          name="main__form__text"
          onChange={handleChange}
          placeholder="Enter main form text.."
          type="text"
          required
        />
        <input
          value={configData.main__prompt}
          name="main__prompt"
          onChange={handleChange}
          placeholder="Enter main form prompt.."
          type="text"
          required
        />

        <button className="submit">Submit</button>


      <button
        onClick={async () => {
          localStorage.clear("images");
          // toast.success("All images cleared...");
          await deleteOldImages()
        }}
        id="cache__btn"
      >
        Clear Cache
      </button>
      </form>
    </div>
  );
}

export default Config;
