
// const App = () => {
//   return (
//     <div className="App">
//       <h2>Hello World</h2>
//       <StripeContainer />
//     </div>
//   );
// };

import React from "react";
import StripeContainer from "./Stripe/StripeContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import Navbar from "./Components/navbar";
import Register from "./Components/register";
import ViewMethods from "./Components/view_methods";
import EditMethod from "./Components/edit_method";
import ViewProjects from "./Components/view_projects";
import CreateProject from "./Components/create_project";
import EditProject from "./Components/edit_project";
 
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<><Navbar/><Dashboard/></>}></Route>
          <Route path="/projects" element={<ViewProjects/>}></Route>
          <Route path="/methods" element={<ViewMethods/>}></Route>
          <Route path="/methods/edit/:id" element={<EditMethod/>}></Route>
          <Route path="/projects/create" element={<CreateProject/>}></Route>
          <Route path="/projects/edit/:id" element={<EditProject/>}></Route>
          <Route path="/projects/donate/:id" element={<StripeContainer/>}></Route>
        </Routes>
    </BrowserRouter>
  );
};
 
export default App;
