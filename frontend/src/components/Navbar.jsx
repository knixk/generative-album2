import React from "react";

import { myContext } from "../App";
import { useContext } from "react";

console.log(window.location.pathname)

function Navbar() {

  const MyState = useContext(myContext);
  const { isLoading, setIsLoading } = MyState;

  console.log(MyState)

  if (isLoading) {
    return ""
  }

  return (
    <nav>
      <h2>Indroyd Labs Demo</h2>
    </nav>
  );
}

export default Navbar;
