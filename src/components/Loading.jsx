import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;