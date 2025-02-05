import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../App";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader";

const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;

// const localIP = `http://localhost:3000/`;
// const fixedIP = `http://192.168.0.105:3000/`;
// const ngrokAdd = `https://2c8c-206-84-237-190.ngrok-free.app`;

// send the data on port - sender --------
import io from "socket.io-client";
import DynamicForm from "./DynamicForm";

// IndexedDB setup ----------
// so this takes in a default value, and it won't work if u put a wrong one, but will if u omut it
// const `socket` = io('ws://192.168.0.105:3000');
// const bigMonitor = 'http://192.168.0.118:3000'
let socket;
// let ipAddress;

function submitData(payload) {
  socket.emit("new-image", payload); // Send image to server
}

// ----------- Main app function ----------------
function Main() {
  // const valentineDay = `Valentine's day celebration at`;

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
    name,
    setName,
    ipAddress,
    refresh,
    localState,
    setLocalState,
    labelVals,
    setLabelVals,
    formValues, setFormValues
  } = myState;

  socket = localState && io(localState.ip__address);
  // console.log(socket)

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


    // console.log(localState.main__form__text1);
    console.log(formValues)

    let template2 = localState.main__form__text1
    template2.replace(/\{(\d+)\}/g, (_, n) => formValues && formValues[n]);
    console.log(template2)


    console.log(formValues)
    toast("Please wait while we ready your creation...");

    const finalStr2 = `${localState.main__form__text1} ${labelVals.val1} ${localState.main__form__text2} ${labelVals.val2} ${localState.main__form__text3} ${labelVals.val3}`;
    // console.log(finalStr2);

    return
    const finalStr = `${localState.main__prompt} ${prompt}`;
    console.log(finalStr);

    try {
      // console.log(ipAddress);
      // ----- uncomment this line to generate the image -----
      const data = await axios.post(
        "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic",
        {
          inputs: finalStr2,
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

  const handleLabelChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    // console.log(name, value);
    setLabelVals((prev) => ({ ...prev, [name]: value }));

    console.log(labelVals);
  };

  if (isLoading) {
    return <Loader />;
  }

  useEffect(() => {
    // console.log(introText)
    console.log("component was mounted..");
    // console.log(configData);
    const mainBtn = document.querySelector("#submit__btn");
    // myDoc.style.backgroundImage = `url(${localState.bg__img})`;
    // darker background
    if (mainBtn) {
      mainBtn.style.backgroundColor = localState.theme__color;
      // console.log(mainBtn)
      console.log("color was set");
    }

    console.log(localState.main__form__text1);
    let mytemp = localState.main__form__text1;
    // mytemp.replace()

    const splitted =
      localState.main__form__text1 && localState.main__form__text1.split("}");
    // const newStr = splitted && splitted.map((i) => {
    // console.log(i)
    // const newI = i.split("{");
    // console.log(newI, "im new i")
    // });
    // console.log(splitted)

    // console.log(localState)
  }, [localState]);

  return (
    <div className="main__container">
      <Toaster />
      <form onSubmit={(e) => handleSubmit(e)} className="form__container">
        <div className="choose__container">
          {/*           
          <label className="prompt__label">
            {localState.main__form__text1}: 
          </label>
          <input
            value={labelVals.val1}
            name="val1"
            onChange={(e) => handleLabelChange(e)}
            placeholder="enter text.."
            type="text"
            required
          /> */}

          <DynamicForm localState={localState && localState} />

         

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
