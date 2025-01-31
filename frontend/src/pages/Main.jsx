import React, { useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import { myContext } from "../App";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader";

const dbName = "the_name";

const request = indexedDB.open(dbName, 2);

const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;

// const localIP = `http://localhost:3000/`;
// const fixedIP = `http://192.168.0.105:3000/`;
// const ngrokAdd = `https://2c8c-206-84-237-190.ngrok-free.app`;

// send the data on port - sender --------
import io from "socket.io-client";

// IndexedDB setup ----------
// so this takes in a default value, and it won't work if u put a wrong one, but will if u omut it
// const socket = io('ws://192.168.0.105:3000');
// const bigMonitor = 'http://192.168.0.118:3000'
const socket = io("ws://192.168.0.106:3000");

function submitData(payload) {
  socket.emit("new-image", payload); // Send image to server
}

// ----------- Main app function ----------------
function Main() {
  const valentineDay = `Valentine's day celebration at`;

  const myState = useContext(myContext);

  const {
    img,
    setImg,
    isLoading,
    setIsLoading,
    prompt,
    setPrompt,
    disabled,
    setDisabled,
    introText,
    setIntroText,
    name,
    setName,
    ipAddress,
    setIPAddress,
    refresh,
    setRefresh,
    configData,
    setConfigData,
    backgroundImg,
    setBackgroundImg,
  } = myState;

  // Add image to IndexedDB

  const setBackground = (img) => {
    // setBackgroundImg(img);
    const myDoc = document.querySelector("body");
    myDoc.style.backgroundImage = `url(${img})`;
  };

  useEffect(() => {
    backgroundImg && setBackground(backgroundImg);
    console.log("img was updated")
  }, [backgroundImage]);

  const handleAddImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to fetch image.");
      const blob = await response.blob();

      // Save to IndexedDB
      const id = Date.now(); // Unique ID
      await addToDB(dbName, storeName, { id, blob });

      // Update UI
      setImages((prev) => [...prev, { id, blob }]);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const uploadImage = async (imageUrl) => {
    // console.log(imageUrl, "im i u");
    try {
      const response = await axios.post("http://localhost:5051/upload-image", {
        imageUrl,
        name,
      });
      // console.log("Image saved:", response.data.imagePath);
      return response.data.imagePath;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const myAsyncFn = async () => {
    if (prompt == "" || name == "" || ipAddress == "") {
      return;
    }

    toast("Please wait while we ready your creation...");

    const finalStr = `${valentineDay} ${prompt}`;
    // console.log(finalStr)

    try {
      // console.log(ipAddress);
      // ----- uncomment this line to generate the image -----
      const data = await axios.post(
        "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic",
        {
          inputs: finalStr,
        },
        {
          headers: {
            "X-Rapidapi-Key":
              "12bd4f84e7msha12d050fcf41207p19242cjsncb3d832cee2e",
            "X-Rapidapi-Host": "ai-text-to-image-generator-api.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        }
      );

      const genImg = data.data.url;
      // const genImg = `http://localhost:5051/images/image_1738213756278.jpg`;

      genImg && (await uploadImage(genImg));

      setImg(genImg);

      // now we got the image we can send it to the backend
      const myPayload = {
        name: name,
        image: genImg,
      };

      // only and only if the image is present then we make this call..
      genImg && submitData(myPayload);

      toast.success("Your image is successfully generated!");
      setIsLoading(false);

      // console.log(myPayload);
      setDisabled(false);

      setPrompt("");
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setIsLoading(true);
    await myAsyncFn();
  };

  // Convert blob to URL for rendering
  const getBlobUrl = (blob) => URL.createObjectURL(blob);

  // Add all images (background processing)
  // add a single image
  const addAllImages = () => {
    exampleImageLinks.forEach((link) => handleAddImage(link));
  };

  if (isLoading) {
    return <Loader />;
  }

  useEffect(() => {
    // console.log(introText)
    console.log("component was mounted..");
    console.log(configData);
  }, [refresh]);

  return (
    <div className="main__container">
      <Toaster />
      <form onSubmit={(e) => handleSubmit(e)} className="form__container">
        <div className="choose__container">
          <p className="prompt__label">
            I'd like to celebrate Valentine's day at:
            {/* {configData.main__prompt},  */}
            {/* {configData.main__form__text} */}
          </p>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter place.."
            type="text"
            required
          />

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name.."
            type="text"
            required
            autoFocus
          />

          <button id="submit__btn" disabled={disabled} onClick={() => {}}>
            Submit
          </button>
        </div>
      </form>

      {/* <img src={'http://localhost:5000/images/image_1738213756278.jpg'} alt="" /> */}
    </div>
  );
}

export default Main;
