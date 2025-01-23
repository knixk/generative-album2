import React, { useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
// import { myContext } from "../App";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;

// IndexedDB setup ----------

// const request = indexedDB.open("MyDatabase", 1);

// request.onupgradeneeded = (event) => {
//   const db = event.target.result;
//   db.createObjectStore("MyStore", { keyPath: "id" });
// };

// request.onsuccess = (event) => {
//   console.log("Database opened successfully!");
// };

// request.onerror = (event) => {
//   console.error("Database error:", event.target.error);
// };

// IndexedDB setup ----- x -----

// send the data on port - sender --------
import io from "socket.io-client";
const socket = io("http://localhost:3000");

function submitData(payload) {
  socket.emit("new-image", payload); // Send image to server
}

function Main() {
  // const myState = useContext(myContext);
  // console.log("==========================>");
  // console.log(myState.formData);
  // console.log("==========================>");
  // ---- send this prompt to the api
  const [name, setName] = useState();
  const [prompt, setPrompt] = useState();
  // ---- send this img to backend socket
  const [img, setImg] = useState();
  const [disabled, setDisabled] = useState(false);

  // const {
  //   formData,
  //   setFormData,
  //   lastGeneratedImg,
  //   setLastGeneratedImg,
  //   submitDisabled,
  //   setSubmitDisabled,
  // } = myState;

  // const fetchImage = async () => {
  //   const url =
  //     "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic";
  //   const headers = {
  //     "X-Rapidapi-Key": "cef7de3f42msh47f9ebffe210c03p10be64jsn0c9f66beeaaf",
  //     "X-Rapidapi-Host": "ai-text-to-image-generator-api.p.rapidapi.com",
  //     "Content-Type": "application/json",
  //   };
  //   const data = {
  //     inputs:
  //       "Find serenity in the tranquil elegance of a solitary sailboat drifting on a glassy lake at sunset",
  //   };

  //   try {
  //     const response = await axios.post(url, data, { headers });
  //     console.log(response.data); // Handle the response as needed
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const myAsyncFn = async () => {
    if (prompt == "" || name == "") {
      return;
    }

    toast("Please wait while we ready your creation...");

    try {
      const data = await axios.post(
        "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic",
        {
          inputs: prompt,
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

      // console.log("======== im data =========>");
      // console.log(data.data.url);
      const genImg = data.data.url;
      // const genImg = sampleImg;

      setImg(genImg);
      // console.log("======== im data =========>");

      // now we got the image we can send it to the backend
      const myPayload = {
        name: name,
        image: genImg,
      };

      // only and only if the image is present then we make this call..
      genImg && submitData(myPayload);
      toast.success("Your image is successfully generated!");

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
    // console.log("submitted");
    // console.log(prompt);
    // fetchImage();
    await myAsyncFn();

    // img && submitData(img);

    //  ------ submit the iamge here.
    // submitData("link")
  };

  useEffect(() => {}, []);

  return (
    <div className="main__container">
      <Toaster />
      <form onSubmit={(e) => handleSubmit(e)} className="form__container">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name.."
          type="text"
          required
          autoFocus
        />
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt.."
          type="text"
          required
        />

        <button disabled={disabled} onClick={() => {}}>
          Submit
        </button>
      </form>

      {/* <Grid /> */}
    </div>
  );
}

export default Main;
