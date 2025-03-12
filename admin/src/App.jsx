import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import AdminLogin from './Components/AdminLogin/AdminLogin';

// TODO: npm run dev

const App = () =>{
  return(
    <div>
      <Navbar/>
      <Admin/>
    </div>
  )
}



export default App;