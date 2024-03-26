import React, { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

type Props = {};

type LoginFormInputs = {
  username: string;
  password: string;
};

const validation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
const LoginPage = (props: Props) => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validation),
  });
  const handleLogin = (form: LoginFormInputs) => {
    loginUser(form.username, form.password);
  };

  return (
    <section className="flex flex-col justify-center items-center h-full my-40 ">
      <div className="w-[370px] h-[400px] bg-orangeIsh rounded-2xl flex flex-col justify-center items-center">
        <form
          className="flex flex-col gap-y-6  items-center justify-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h3 className="mx-8">Sign in to your account</h3>
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="rounded-md px-2 py-1 my-2"
              {...register("username")}
            />
            {errors.username ? (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="rounded-md px-2 py-1 my-2"
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="w-[220px] bg-greenIsh h-10 rounded-2xl hover:border hover:border-gray-500"
          >
            Sign in
          </button>
        </form>
        <Link
          to="/register"
          className="text-gray-400 block text-sm mx-auto mt-2"
        >
          Don't have an account yet? Register here
        </Link>
      </div>
    </section>
  );
};

export default LoginPage;
