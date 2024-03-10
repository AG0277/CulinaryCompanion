import { Outlet } from "react-router";
import "./App.css";
import SearchPage from "./Pages/SearchPage";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
