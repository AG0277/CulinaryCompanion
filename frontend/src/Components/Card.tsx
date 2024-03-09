import React from "react";

interface Props {
  recipeName: string;
  image: string;
  id: number;
}

const Card: React.FC<Props> = ({
  recipeName,
  image,
  id,
}: Props): JSX.Element => {
  return (
    <div className="inline-block  m-5 rounded border-1 shadow-2xl hover:scale-110 transition-transform duration-500 ease-in-out hover:cursor-pointer">
      <div className="flex flex-col max-w-[312px]">
        <img className="max-h-[231px]" src={image} alt="" />
        <h2 className=" mt-5 h-20 overflow-hidden text-center">{recipeName}</h2>
      </div>
    </div>
  );
};

export default Card;
