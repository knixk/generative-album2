import React, { useContext, useEffect, useRef } from 'react'
import { myContext } from '../App';
// import createa


function Config() {

  const myState = useContext(myContext);
  const { configData, setConfigData } = myState;

  const bodyRef = useRef(null);

  console.log(myState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfigData({ ...configData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted")
    console.log(configData)


    const myDoc = document.querySelector("body");
    myDoc.style.backgroundImage = `url(${configData.bg__url})`


    // store this image somehow
    console.log(myDoc)



    // ------ clear the form
    // setConfigData({})
  }

  useEffect(() => {

  }, [])

  return (
    <div className='config__container'>
      <form onSubmit={ handleSubmit }  className="config__form">
        <input value={configData.max__number}  name='max__number'  onChange={handleChange} placeholder='Maximum number of images on canvas..' type="number" required />
        <input value={configData.bg__url} name='bg__url' onChange={handleChange} placeholder='Enter background image url..' type="url" required />
        <input value={configData.main__form__text} name='main__form__text' onChange={handleChange} placeholder='Enter main form text..' type="text" required />
        <input value={configData.main__prompt} name='main__prompt' onChange={handleChange} placeholder='Enter main form prompt..' type="text" required />

        
        <button className="submit">Submit</button>
      </form>
    </div>
  )
}

export default Config