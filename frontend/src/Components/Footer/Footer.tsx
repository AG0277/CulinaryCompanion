import React from "react";
import Instagram from "../../Images/instagram.png";
import Facebook from "../../Images/facebook.png";
import Pinterest from "../../Images/pinterest.png";
import Youtube from "../../Images/youtube.png";
import Twitter from "../../Images/twitter.png";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-greenIsh h-52 flex flex-col justify-evenly items-center mt-auto">
      <div className=" flex gap-4 justify-center ">
        <a
          href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          rel="noreferrer"
          target="_blank"
        >
          <img src={Instagram} alt="" className="w-10" />
        </a>
        <a
          href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          rel="noreferrer"
          target="_blank"
        >
          <img src={Facebook} alt="" className="w-10" />
        </a>
        <a
          href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          rel="noreferrer"
          target="_blank"
        >
          <img src={Twitter} alt="" className="w-10" />
        </a>
        <a
          href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          rel="noreferrer"
          target="_blank"
        >
          <img src={Pinterest} alt="" className="w-10" />
        </a>
        <a
          href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
          rel="noreferrer"
          target="_blank"
        >
          <img src={Youtube} alt="" className="w-10" />
        </a>
      </div>
      <p className="text-gray-500 text-center ">
        © Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ipsa
        consequatur nobis dicta veniam quo et distinctio nemo labore vel modi
        obcaecati eos ex voluptatem ducimus neque, tenetur commodi expedita.
      </p>
    </div>
  );
};

export default Footer;
