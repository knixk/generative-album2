import React, { useContext } from 'react'
import { myContext } from '../App';
// import createa


function Config() {

  const myState = useContext(myContext);
  const { configDta, setConfigData } = myState;

  // console.log(myState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfigData({ ...configDta, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted")
    console.log(configDta)
  }

  return (
    <div className='config__container'>
      <form onSubmit={ handleSubmit }  className="config__form">
        <input onChange={handleChange} placeholder='Maximum number of images on canvas..' type="number" required />
        <input onChange={handleChange} placeholder='Enter background image url..' type="url" required />
        <input onChange={handleChange} placeholder='Enter main form text..' type="text" required />
        <input onChange={handleChange} placeholder='Enter main form prompt..' type="text" required />

        
        <button className="submit">Submit</button>
      </form>
    </div>
  )
}

export default Config