import logo from "./logo.svg";
import Nav from "./Nav";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddCustomer from "./AddCustomer";
import Edit from "./Edit";

function App() {
  return (
    <>
      <Router>
        <ToastContainer position="top-center" autoClose={5000} pauseOnHover/>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<AddCustomer />} />
          <Route exact path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
