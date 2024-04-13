import React from "react";
import "./Welcome.css"; // Import the CSS file

function Welcome() {
  return (
    <div className="px-20 rounded overflow-hidden shadow-lg bg-gray-200 m-4">
      <div className="px-20 py-14">
        <p className="text-gray-700 text-xl">
          Compress your heavy files in our data compressor like Audio, Images,
          and Video files with minimum compromise in the quality of the file. We
          use a special technique which involves Huffman coding that keeps the
          quality less distorted.
        </p>
      </div>
    </div>
  );
}

export default Welcome;
