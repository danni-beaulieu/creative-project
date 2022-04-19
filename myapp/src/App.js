
// const App = () => {
//   return (
//     <div className="App">
//       <h2>Hello World</h2>
//       <StripeContainer />
//     </div>
//   );
// };

import React from "react";
// import StripeContainer from "./Stripe/StripeContainer";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import Navbar from "./Components/navbar";
import Register from "./Components/register";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<><Navbar/><Dashboard/></>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
 
export default App;
