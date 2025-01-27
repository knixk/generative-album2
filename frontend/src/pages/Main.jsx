import React, { useContext, useEffect, useState } from "react";
import Grid from "../components/Grid";
import { myContext } from "../App";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import * as nsfwjs from "nsfwjs";
import Loader from "../components/Loader";

// This is what our customer data looks like.
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
];

const dbName = "the_name";

const request = indexedDB.open(dbName, 2);

request.onerror = (event) => {
  // Handle errors.
};
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = (event) => {
    // Store values in the newly created objectStore.
    const customerObjectStore = db
      .transaction("customers", "readwrite")
      .objectStore("customers");
    customerData.forEach((customer) => {
      customerObjectStore.add(customer);
    });
  };
};

const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;

const localIP = `http://localhost:3000/`;
const fixedIP = `http://192.168.0.105:3000/`;
const ngrokAdd = `https://2c8c-206-84-237-190.ngrok-free.app`;

// send the data on port - sender --------
import io from "socket.io-client";

// IndexedDB setup ----------
const socket = io("http://localhost:3000");

function submitData(payload) {
  socket.emit("new-image", payload); // Send image to server
}

// IndexedDB helper functions
const openDB = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const addToDB = async (dbName, storeName, data) => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.add(data);
  return transaction.complete;
};

// IndexedDB setup ----- x -----

// ----------- Main app function ----------------
function Main() {
  const valentineDay = `A breathtaking and romantic setting capturing the essence of a Valentine's Day celebration in`;

  const myState = useContext(myContext);
  // console.log("==========================>");
  // console.log(myState);

  const { img, setImg, isLoading, setIsLoading } = myState;

  // console.log("==========================>");
  // ---- send this prompt to the api
  const [name, setName] = useState();
  const [prompt, setPrompt] = useState();
  // ---- send this img to backend socket
  const [disabled, setDisabled] = useState(false);
  const [model, setModel] = useState(null);
  const [ipAddress, setIPAddress] = useState("http://192.168.0.105:3000/");

  // console.log(socket);

  // const {
  //   formData,
  //   setFormData,
  //   lastGeneratedImg,
  //   setLastGeneratedImg,
  //   submitDisabled,
  //   setSubmitDisabled,
  // } = myState;

  // Add image to IndexedDB
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

  // Load the NSFW.js model on component mount
  // useEffect(() => {
  //   const loadModel = async () => {
  //     const loadedModel = await nsfwjs.load(); // Load the NSFW model
  //     setModel(loadedModel);
  //   };
  //   loadModel();
  // }, []);

  // Check if an image is NSFW
  const analyzeImage = async (imageUrl) => {
    try {
      let img = new Image();
      img.crossOrigin = "anonymous"; // Avoid CORS issues
      img.src = imageUrl;

      // Wait for the image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      if (model) {
        const predictions = await model.classify(img); // Classify the image
        // console.log(predictions);
        // setImageResults((prev) => [...prev, { url: imageUrl, predictions }]);
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
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
      console.log(ipAddress);
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

      // console.log("======== im data =========>");
      // console.log(data.data.url);
      // ---x-- uncomment this line to generate the image ---x--

      const genImg = data.data.url;

      // const genImg = sampleImg;

      setImg(genImg);
      // console.log("======== im data =========>");
      // const imgElem = new Image();
      // imgElem.crossOrigin = "anonymous"; // Avoid CORS issues
      // imgElem.src = genImg;

      // now we got the image we can send it to the backend
      const myPayload = {
        name: name,
        image: genImg,
      };

      // only and only if the image is present then we make this call..
      genImg && submitData(myPayload);
      // submitData(myPayload);

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
    // console.log("submitted");
    // console.log(prompt);
    // fetchImage();
    setIsLoading(true);
    await myAsyncFn();

    // img && submitData(img);

    //  ------ submit the iamge here.
    // submitData("link")
  };

  // useEffect(() => {}, []);

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

  return (
    <div className="main__container">
      <Toaster />
      <form onSubmit={(e) => handleSubmit(e)} className="form__container">
        <div className="choose__container">
          {/* <input
            value={ipAddress}
            onChange={(e) => {
              setIPAddress(e.target.value);
              // console.log(ipAddress)
            }}
            type="text"
            placeholder="Enter device ip address"
          /> */}
          <p className="prompt__label">
            I want to celebrate valentine's day at:
          </p>
          {/* <select onChange={(e) => console.log(e.target.value)}>
          <option value="Paris">Paris</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
        </select> */}
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter place.."
            type="text"
            required
          />
        </div>

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
      </form>

      <button
        onClick={() => {
          localStorage.clear("images");
          toast.success("All images cleared...");
        }}
        id="cache__btn"
      >
        Clear Cache
      </button>

      {/* <Grid /> */}
    </div>
  );
}

export default Main;
