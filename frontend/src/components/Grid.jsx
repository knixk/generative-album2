import React from "react";
import img from "../assets/img.webp";


function Grid() {
  return (
    <div className="album__grid">
      <div className="card__container">
        <img className="generated__img" src={img} alt="" />
        <p className="name">Kanishk Shrivastava</p>
      </div>
      <div className="card__container">
        <img className="generated__img" src={img} alt="" />
        <p className="name">Kanishk Shrivastava</p>
      </div>
      <div className="card__container">
        <img className="generated__img" src={img} alt="" />
        <p className="name">Kanishk Shrivastava</p>
      </div>
      <div className="card__container">
        <img className="generated__img" src={img} alt="" />
        <p className="name">Kanishk Shrivastava</p>
      </div>
      <div className="card__container">
        <img className="generated__img" src={img} alt="" />
        <p className="name">Kanishk Shrivastava</p>
      </div>
    </div>
  );
}

export default Grid;
