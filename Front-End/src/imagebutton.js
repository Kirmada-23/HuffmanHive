import React, { useState } from "react";

function Imagebutton() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [compressedImageData, setCompressedImageData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name); // Store the uploaded file name
      compressImage(file);
    }
    // Clear input value to allow selecting the same file again
    event.target.value = "";
  };

  const compressImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const compressedImageData = canvas.toDataURL("image/jpeg", 0.1);
        setCompressedImageData(compressedImageData);
      };
    };
  };

  const handleDownload = () => {
    if (compressedImageData) {
      // If there's compressed image data, initiate download
      const link = document.createElement("a");
      link.href = compressedImageData;
      // Set the download link's name to match the uploaded file name
      link.download = uploadedFileName.replace(/\.[^/.]+$/, "_compressed.jpg");
      link.click();

      // Reset compressedImageData state after download
      setCompressedImageData(null);
      setUploadedFileName(""); // Clear the uploaded file name
    }
  };

  return (
    <div>
      <label htmlFor="file-upload" className="button">
        Upload Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".jpg, .png"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      <br />
      {compressedImageData && (
        <div>
          {" "}
          <button className="button text-xs mr-2 mb-2" onClick={handleDownload}>
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}

export default Imagebutton;
