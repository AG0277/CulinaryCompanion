import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddFavorite from "../Favorite/AddFavorite";
import AddFavoriteComponent from "../Favorite/AddFavorite";
import { title } from "process";

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
  const handleClick = async (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      {image && (
        <div
          className={`${css} mr-8 rounded border-1 shadow-md  hover:cursor-pointer max-w-[312px]`}
        >
          <Link to={`/recipe/${id}`}>
            <div className="" onClick={handleClick}>
              <AddFavoriteComponent
                spoonacularId={id}
                title={title}
                image={image}
              />
            </div>
            <div className="flex flex-col">
              <img className="max-h-[231px] " src={image} alt="" />

              <p className=" mt-5 h-20 overflow-hidden text-center">
                {recipeName}
              </p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Card;
