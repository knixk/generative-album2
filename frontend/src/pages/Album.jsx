import React, { useEffect, useState } from "react";

// import * as nsfwjs from "nsfwjs";
// const model = await nsfwjs.load();

// recieve the image on port -------  receiver
import io from "socket.io-client";
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
  const [albums, setAlbums] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState();
  const myState = useContext(myContext);
  const { isLoading, setIsLoading } = myState;

  const handleDelete = (i) => {
    return;
  };

  const handleAddToAlbum = (data) => {
    const { name, image } = data;
    let img = image;
    setImg(image);
    const newItem = { name, img, id: new Date() };
    // console.log(newItem, "ni");
    const newData = [...albums, newItem];

    const stringifyImgs = JSON.stringify(newData);
    // console.log(stringifyImgs);
    localStorage.setItem("images", stringifyImgs);

    // console.log(newData, "im nd");
    // console.log("updated");
    setAlbums(newData);
  };

  const classifyImage = async (img) => {
    const predictions = await model.classify(img);
    console.log(predictions);
    return predictions;
  };

  useEffect(() => {
    const images = localStorage.getItem("images");

    if (images) {
      const parsedImgs = JSON.parse(images);
      setAlbums(parsedImgs);
      // console.log(parsedImgs);
    } else {
    }
  }, []);

  useEffect(() => {
    // if (images) {
    //   const json_images = JSON.parse(images);
    //   setAlbums(json_images);
    // } else {
    //   localStorage.setItem("images", JSON.stringify(albums));
    // }

    socket.on("update-album", (data) => {
      // alert("yes")
      // console.log(data);
      handleAddToAlbum(data);
      console.log("image was added");
      setShowModal(true);
      // setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 7500);
    });
  }, [albums]);

  // Load images from IndexedDB on component mount
  // useEffect(() => {
  //   const loadImages = async () => {
  //     const storedImages = await getAllFromDB(dbName, storeName);
  //     setImages(storedImages);
  //     console.log(storedImages, "im stored images");
  //   };

  //   loadImages();
  // }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="album__container">
      <Toaster />
      {/* <p>Your lovely creations..</p> */}
      {showModal ? (
        <Modal props={{ img }} />
      ) : (
        <div className="album__grid">
          {albums.map((i, idx) => {
            // let imgElem = new Image();
            // imgElem.crossOrigin = "anonymous"; // Avoid CORS issues
            // imgElem.src = genImg;
            // classifyImage(imgElem);
            return (
              // <div key={idx} className="card__container">
              //   <img className="generated__img" src={i.img} alt={i.name} />
              //   <p className="name">{i.name}</p>
              //   <button className="delete__btn">x</button>
              // </div>

              <div key={idx} className="card__container">
                <img className="generated__img" src={i.img} alt={i.name} />
                <p className="name">{i.name}</p>
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
