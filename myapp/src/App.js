
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
import ViewProjects from "./Components/view_projects";
import CreateProject from "./Components/create_project";
import EditProject from "./Components/edit_project";
 
function App() {
  return (
    <BrowserRouter>
        <div className="container">
        <div className="columns">
        <div className="column is-half is-offset-one-quarter">
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<><Navbar/><Dashboard/></>}></Route>
          <Route path="/projects" element={<ViewProjects/>}></Route>
          <Route path="/projects/create" element={<CreateProject/>}></Route>
          <Route path="/projects/edit/:id" element={<EditProject/>}></Route>
        </Routes>
        </div>
        </div>
        </div>
    </BrowserRouter>
  );
};
 
export default App;
