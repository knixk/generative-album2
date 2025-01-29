import React from 'react'

function Config() {
<<<<<<< Updated upstream
=======

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

>>>>>>> Stashed changes
  return (
    <div>Config</div>
  )
}

export default Config