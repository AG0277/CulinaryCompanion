import React, { ChangeEvent, SyntheticEvent } from "react";

interface Props {
  search: string | undefined;
  onSearchSubmit: (e: SyntheticEvent) => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<Props> = ({
  onSearchSubmit,
  search,
  handleSearchChange,
}: Props): JSX.Element => {
  return (
    <form
      onSubmit={onSearchSubmit}
      className="flex justify-center my-20 text-2xl"
    >
      <input
        className="w-1/5 border-8 border-emerald-400 p-2 pl-6 rounded-2xl focus:outline-none"
        placeholder="Find a recipe or ingredient"
        value={search}
        onChange={(e) => handleSearchChange(e)}
        type="text"
      />
    </form>
  );
};

export default SearchBar;
