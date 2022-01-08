import React from "react";
import { Link } from "react-router-dom";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt="" />
      </div>
      <p>
        Download Image Here{" "}
        <a target="_blank" href={data.src.large}>
          Click Here
        </a>
      </p>
    </div>
  );
};

export default Picture;
