import React, { useContext } from 'react'
import { myContext } from '../App';
// import createa


function Config() {

  const myState = useContext(myContext);
  const { configDta, setConfigData } = myState;

  console.log(myState)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted")
  }

  return (
    <div className='config__container'>
      <form onSubmit={ handleSubmit }  className="config__form">
        <input placeholder='Maximum number of images on canvas..' type="number" required />
        <input placeholder='Enter background image url..' type="url" required />
        <input placeholder='Enter main form text..' type="text" required />
        <input placeholder='Enter main form prompt..' type="text" required />

        
        <button className="submit">Submit</button>
      </form>
    </div>
  )
}

export default Config