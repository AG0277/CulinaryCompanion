import React, { createContext, useEffect, useState } from "react";
import { UserProfile, UserProfileToken } from "../Models/User";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

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
    setIsReady(true);
    axios.defaults.headers.common["Authorization"] = "Bearer" + token;
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res?) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const userObj = {
            userName: res.data.userName,
            email: res.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res.data.token);
          setUser(userObj);
          toast.success("Login success");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
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
            userName: res.data.userName,
            email: res.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res.data.token);
          setUser(userObj);
          toast.success("Login success");
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
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
    setUser(null);
    setToken("");
    delete axios.defaults.headers.common["Authorization"];
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
