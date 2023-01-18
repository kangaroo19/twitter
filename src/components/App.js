import { useState } from "react";
import React from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";
function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(authService.currentUser)
  console.log(authService.currentUser)

  return (
    <div><AppRouter isLoggedIn={isLoggedIn}/></div>
  );
}

export default App;
