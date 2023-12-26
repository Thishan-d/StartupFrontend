import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbra";
import Addstartup from "./Components/Addstartup";
import UpdateStartup from "./Components/UpdateStartup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/addStartup" element={<Addstartup />} />
        <Route path="/updateStartup/:startupId" element={<UpdateStartup />} />
      </Routes>
    </Router>
  );
}

export default App;


