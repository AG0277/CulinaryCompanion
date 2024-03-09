import React, { ChangeEvent, SyntheticEvent } from "react";

interface Props {
  search: string | undefined;
  onClick: (e: SyntheticEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<Props> = ({
  search,
  onClick,
  handleChange,
}: Props): JSX.Element => {
  return (
    <div>
      <input value={search} onChange={(e) => handleChange(e)} type="text" />
      <button onClick={(e) => onClick(e)}>Submit</button>
    </div>
  );
};

export default SearchBar;
