import React, { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Form, Link } from "react-router-dom";

interface Props {}

const SearchBar: React.FC<Props> = ({}: Props): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };
  return (
    <form
      onSubmit={onSearchSubmit}
      className="flex flex-row items-center border-orangeIsh rounded-2xl focus:outline-none border-8 bg-white w-[600px] h-[55px]"
    >
      <input
        className="p-2 pl-6  w-11/12 bg-transparent outline-none"
        placeholder="Find a recipe or ingredient"
        value={search}
        onChange={(e) => handleSearchChange(e)}
        type="text"
      />
      <Link to={`/search/:${search}`} className="w-1/12 h-full ">
        <div className="h-full w-full bg-orangeIsh items-center justify-center flex hover:rounded-r-lg hover:bg-orange-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8/12 h-8/12 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </Link>
    </form>
  );
};

export default SearchBar;