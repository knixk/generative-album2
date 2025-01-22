  import React, { useEffect, useState } from "react";

  // recieve the image on port ------- receiver
  import io from "socket.io-client";
  const socket = io("http://localhost:3000");

  import img from "../assets/img.webp";
  import toast, { Toaster } from "react-hot-toast";
  import Modal from "../components/Modal";

  const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;

  // --- replace this with real data ----
  const data = [
    {
      id: "1231d2",
      img: img,
      name: "Kanishk Shrivastava",
    },
    {
      id: "12asd32312",
      img: "https://thefusioneer.com/wp-content/uploads/2023/11/5-AI-Advancements-to-Expect-in-the-Next-10-Years-scaled.jpeg",
      name: "Tanishk Shrivastava",
    },
    {
      id: "123sda12",
      img: "https://cdn.pixabay.com/photo/2023/03/11/22/21/ai-generated-7845461_640.jpg",
      name: "Ayush Rana",
    },
    {
      id: "12312312",
      img: "https://cdn.pixabay.com/photo/2023/01/26/22/13/ai-generated-7747149_1280.jpg",
      name: "Saniya Sultana",
    },
    {
      id: "12312312",
      img: "https://img.freepik.com/premium-photo/generative-ai-image-victoria-majestic-waterfall-with-rock-stone-cliff-nature-rainbow-wallpaper_467541-15025.jpg",
      name: "Kavya Maurya",
    },
    {
      id: "12312312",
      img: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/268c4b03-533f-4e81-aec1-0c22df466a90/2e6a3dd3-e59f-445e-b998-1c03afd15b3e.png",
      name: "Ajay Sisodiya",
    },
    {
      id: "12312312",
      img: "https://as2.ftcdn.net/jpg/05/36/62/97/1000_F_536629702_9FkGvzElExv4TpJwr5S03yJHdS3hADR6.jpg",
      name: "Arun Gehlot",
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
        setShowModal(true)
        // setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
        }, 7500);
      });
    }, [albums]);
    return (
      <div className="album__container">
        <Toaster />
        {/* <p>Your lovely creations..</p> */}
        {showModal ? (
          <Modal props={{ sampleImg }} />
        ) : (
          <div className="album__grid">
            {albums.map((i, idx) => {
              return (
                <div key={idx} className="card__container">
                  <img className="generated__img" src={i.img} alt={i.name} />
                  <p className="name">{i.name}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  export default Album;
