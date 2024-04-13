import React from "react";
import Imagebutton from "./imagebutton";

function Image() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src="/photo.png" height="100px" width="100px" alt="Profile Icon" />
      <Imagebutton />
    </div>
  );
}

export default Image;
