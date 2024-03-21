import React from "react";
import { Link } from "react-router-dom";

interface Props {
  recipeName: string;
  image: string;
  id: number;
  css?: string;
}

const Card: React.FC<Props> = ({
  recipeName,
  image,
  id,
  css,
}: Props): JSX.Element => {
  return (
    <Link to={`/recipe/${id}`}>
      <div
        className={`${css} mr-8 rounded border-1 shadow-md hover:scale-110 transition-transform duration-500 ease-in-out hover:cursor-pointer max-w-[312px]`}
      >
        <div className="flex flex-col">
          <img className="max-h-[231px]" src={image} alt="" />
          <p className=" mt-5 h-20 overflow-hidden text-center">{recipeName}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
