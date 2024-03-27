import React, { createContext, useEffect, useState } from "react";
import { UserProfile, UserProfileToken } from "../Models/User";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { useFavorites } from "./useFavorite";

export type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(username, email, password)
      .then((res?) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const userObj = {
            username: res.data.username,
            email: res.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res.data.token);
          setUser(userObj);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
          navigate("/homepage");
        }
      })
      .catch((e) => toast.warning("Server error occurred" + e));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const userObj = {
            username: res.data.username,
            email: res.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res.data.token);
          setUser(userObj);
          toast.success("Login success");
          console.log(token);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
          navigate("/homepage");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };

  const isLoggedIn = () => {
    return !!user;
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    setUser(null);
    setToken("");
    delete axios.defaults.headers.common["Authorization"];
    window.location.reload();
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
