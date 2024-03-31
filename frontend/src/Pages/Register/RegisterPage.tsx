import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

type Props = {};

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
};
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str}`;
};
const validation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("email is required"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase character"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase character"))
    .matches(
      /[!@#$%^&*()\-_=+{};:,<.>/?]/,
      getCharacterValidationError("special sign character")
    ),
});
const RegisterPage = (props: Props) => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(validation),
  });
  const handleRegistration = (form: RegisterFormInputs) => {
    registerUser(form.username, form.email, form.password);
  };
  return (
    <section className="flex flex-col justify-center items-center h-full my-40 ">
      <div className="w-[370px] h-[520px] bg-orangeIsh rounded-2xl flex flex-col justify-center items-center">
        <form
          className="flex flex-col gap-y-5  items-center justify-center px"
          onSubmit={handleSubmit(handleRegistration)}
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
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="rounded-md px-2 py-1 my-2"
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-sm text-red-400">{errors.email.message}</p>
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
          </div>
          {errors.password ? (
            <p className="text-sm text-red-400 max-w-[220px] ml-2 ">
              {errors.password.message}
            </p>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="w-[220px] bg-buttonColor h-10 rounded-2xl hover:border hover:border-gray-500"
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

export default RegisterPage;
