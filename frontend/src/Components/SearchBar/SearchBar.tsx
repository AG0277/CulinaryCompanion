import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Form, Link } from "react-router-dom";

interface Props {}

const SearchBar: React.FC<Props> = ({}: Props): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };
  return (
    <form
      onSubmit={onSearchSubmit}
      className="flex flex-row items-center border-orange-400 rounded-2xl focus:outline-none border-8 bg-white"
    >
      <input
        className="p-2 pl-6 w-[600px] bg-transparent"
        placeholder="Find a recipe or ingredient"
        value={search}
        onChange={(e) => handleSearchChange(e)}
        type="text"
      />
      <Link to={`/search/:${search}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Link>
    </form>
  );
};

export default SearchBar;
