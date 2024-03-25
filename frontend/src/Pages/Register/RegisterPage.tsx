import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <section className="flex flex-col justify-center items-center h-full my-40 ">
      <div className="w-[370px] h-[500px] bg-orangeIsh rounded-2xl flex flex-col justify-center items-center">
        <form className="flex flex-col gap-y-6  items-center justify-center">
          <h3 className="mx-8">Register account</h3>
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="rounded-md px-2 py-1 my-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="rounded-md px-2 py-1 my-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              id="password"
              type="text"
              placeholder="Password"
              className="rounded-md px-2 py-1 my-2"
            />
          </div>
          <button className="w-[220px] bg-greenIsh h-10 rounded-2xl">
            Register
          </button>
        </form>
        <Link to="/login" className="text-gray-400 block text-sm mx-auto mt-2">
          Already have an account? Login here
        </Link>
      </div>
    </section>
  );
};

export default RegisterPage;
