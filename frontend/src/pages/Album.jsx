import React, { useEffect, useState } from "react";

// recieve the image on port -------  receiver
import io from "socket.io-client";
import axios from "axios";
// const socket = io('ws://192.168.0.105:3000');
// const socket = io();
// const socket = io('ws://192.168.0.105:3000');
// const socket = io('ws://192.168.0.106:3000');
// big monitor
const socket = io("ws://192.168.0.106:3000");

// const socket = io("http://192.168.0.105:3000/");
// const bigMonitor = 'http://192.168.0.118:3000'

import img from "../assets/img.webp";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { myContext } from "../App";
import { useContext } from "react";

const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;

const getAllFromDB = async (dbName, storeName) => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
};

// --- replace this with real data ----
const data = [
  {
    id: "1231d2",
    img: img,
    name: "Kanishk Shrivastava",
    sfw: true,
  },
  {
    id: "12asd32312",
    img: "https://thefusioneer.com/wp-content/uploads/2023/11/5-AI-Advancements-to-Expect-in-the-Next-10-Years-scaled.jpeg",
    name: "Tanishk Shrivastava",
    sfw: true,
  },
  {
    id: "123sda12",
    img: "https://cdn.pixabay.com/photo/2023/03/11/22/21/ai-generated-7845461_640.jpg",
    name: "Ayush Rana",
    sfw: true,
  },
  {
    id: "12312312",
    img: "https://cdn.pixabay.com/photo/2023/01/26/22/13/ai-generated-7747149_1280.jpg",
    name: "Saniya Sultana",
    sfw: true,
  },
  {
    id: "12312312",
    img: "https://img.freepik.com/premium-photo/generative-ai-image-victoria-majestic-waterfall-with-rock-stone-cliff-nature-rainbow-wallpaper_467541-15025.jpg",
    name: "Kavya Maurya",
    sfw: true,
  },
  {
    id: "12312312",
    img: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/268c4b03-533f-4e81-aec1-0c22df466a90/2e6a3dd3-e59f-445e-b998-1c03afd15b3e.png",
    name: "Ajay Sisodiya",
    sfw: true,
  },
  {
    id: "12312312",
    img: "https://as2.ftcdn.net/jpg/05/36/62/97/1000_F_536629702_9FkGvzElExv4TpJwr5S03yJHdS3hADR6.jpg",
    name: "Arun Gehlot",
    sfw: true,
  },
  // {
  //   id: "12312312",
  //   img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ69EWR5a90jYQWOYu8vdbbzLasqQNWHhyVnA&s",
  //   name: "Priyanka Sharma",
  // },
  // {
  //   id: "123sda212312",
  //   img: "https://imgv3.fotor.com/images/gallery/a-3d-girl-cartoon-character-generated-by-cartoon-character-maker-in-Fotor.jpg",
  //   name: "Om Sharma",
  // },
];

function Album() {
  const [albums, setAlbums] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState();
  const myState = useContext(myContext);
  const { isLoading, setIsLoading, refresh, setRefresh, localState, setLocalState } = myState;

  const handleDelete = (i) => {
    return;
  };

  const getAllImages = async () => {
    try {
      // const req = axios.get("http://localhost:5051/get-images");
      const req = axios.get("http://192.168.0.106:5051/get-images");

      const res = await req;
      // console.log(res.data.images);
      return res.data.images;
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToAlbum = (data) => {
    // console.log(data, "inside handle add to -----------=================");
    const { name, image } = data;
    let img = image;
    setImg(image);

    // -------- changes require here, it wants a url but we're giving back an object
    // const newItem = { name, img, id: new Date() };
    // const newItem
    // const finalUrl = ${image}`;

    // const newData = [...albums, ];

    // const stringifyImgs = JSON.stringify(newData);

    // localStorage.setItem("images", stringifyImgs);
    // setAlbums(newData);
  };

  const classifyImage = async (img) => {
    const predictions = await model.classify(img);
    // console.log(predictions);
    return predictions;
  };

  useEffect(() => {
    const myAsyncFn = async () => {
      const images = await getAllImages();
      // console.log(images);
      setAlbums(images);
    };

    myAsyncFn();

    // const images = localStorage.getItem("images");

    // if (images) {
    //   const parsedImgs = JSON.parse(images);
    //   setAlbums(parsedImgs);
    // } else {
    // }
  }, [showModal, refresh]);

  useEffect(() => {
    socket.on("update-album", (body) => {
      handleAddToAlbum(body);
      // console.log(body, "im the body of socket");
      console.log("image was added");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        // forcePageUpdate();
      }, 7500);
    });

    // socket.off("")
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // useEffect(() => {
  //   // backgroundImg && setBackground(backgroundImg);
  //   // console.log("img was updated")
  //   const bg__img = localStorage.getItem("bg__img");
  //   console.log(bg__img)
  //   if (bg__img) {
  //     // setBackground(bg__img)
  //     const myDoc = document.querySelector("body");
  //     myDoc.style.backgroundImage = `url(${bg__img})`;
  //     console.log(myDoc);
  //     console.log("image set");
  //     setRefresh((prev) => !prev)
  //   }

  // }, []);

  useEffect(() => {
    const mainFn = () => {
      // album__bg__img

      // console.log(localState.album__bg__img)

      const myDoc = document.querySelector("body");
      // myDoc.style.backgroundImage = `url(${parsedState.bg__img})`;
      // darker background
      myDoc.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${localState.album__bg__img})`;
    };

    localState && mainFn();
  }, [localState]);

  return (
    <div className="album__container">
      <Toaster />
      {/* <img src="../../../backend/uploads/image_1738213756278.jpg" alt="" /> */}
      {/* <p>Your lovely creations..</p> */}
      {showModal ? (
        <Modal props={{ img }} />
      ) : (
        <div className="album__grid">
          {albums &&
            albums.map((i, idx) => {
              // console.log(i)
              // const finalUrl = `http://localhost:5051/images/${i}`;
              const finalUrl = `http://192.168.0.106:5051/images/${i}`;

              // console.log(i, "IM the I --------------");
              const name2 = i.split("_")[0];
              // console.log(name2)
              // console.log(finalUrl);
              return (
                <div key={idx} className="card__container">
                  <img className="generated__img" src={finalUrl} alt={""} />
                  <p className="name">{`${name2}`}</p>
                  <button className="delete__btn">x</button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Album;
