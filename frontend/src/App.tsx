import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Hooks/useAuth";
import { FavoritesProvider } from "./Hooks/useFavorite";

function App() {
  return (
    <>
      <UserProvider>
        <FavoritesProvider>
          <Navbar />
          <Outlet />
          <ToastContainer />
        </FavoritesProvider>
      </UserProvider>
    </>
  );
}

export default App;
