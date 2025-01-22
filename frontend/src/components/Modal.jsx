import React from "react";

// const sampleImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s`;

function Modal(props) {
//   console.log(props, "im props");
  const { img } = props.props;
  // const img = sampleImg;
//   console.log(img)

  return (
    <div className="modal__container">
      <p>Looks like we have a new generation!</p>
      <img className="modal__img" src={img} alt="image" />
    </div>
  );
}

export default Modal;
