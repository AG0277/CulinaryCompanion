import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Hooks/useAuth";
import { FavoritesProvider } from "./Hooks/useFavorite";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <UserProvider>
          <FavoritesProvider>
            <Navbar />
            <Outlet />
            <ToastContainer />
            <Footer />
          </FavoritesProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
