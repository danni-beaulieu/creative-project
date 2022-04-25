import { useState, React } from "react";
import StripeContainer from "./Stripe/StripeContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Navbar from "./Components/navbar";
import Register from "./Components/register";
import ViewMethods from "./Components/view_methods";
import EditMethod from "./Components/edit_method";
import ViewProjects from "./Components/view_projects";
import CreateProject from "./Components/create_project";
import EditProject from "./Components/edit_project";
import AddCollaborator from "./Components/add_collaborators";
import ViewDonations from "./Components/view_donations";
import ViewUsers from "./Components/view_users";
import { AuthContext } from "./Components/auth_context";
 
function App() {
  const [auth, setAuth] = useState('');

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/projects" element={<><Navbar/><ViewProjects/></>}></Route>
          <Route path="/methods" element={<><Navbar/><ViewMethods/></>}></Route>
          <Route path="/users" element={<><Navbar/><ViewUsers/></>}></Route>
          <Route path="/donations" element={<><Navbar/><ViewDonations /></>}></Route>
          <Route path="/methods/edit/:id" element={<><Navbar/><EditMethod/></>}></Route>
          <Route path="/projects/create" element={<><Navbar/><CreateProject/></>}></Route>
          <Route path="/projects/edit/:id" element={<><Navbar/><EditProject/></>}></Route>
          <Route path="/projects/donate/:id" element={<><Navbar/><StripeContainer/></>}></Route>
          <Route path="/collaborators/:id" element={<><Navbar/><AddCollaborator /></>}></Route>
        </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  );
};
 
export default App;
