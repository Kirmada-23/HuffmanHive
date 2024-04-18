import React, { useState, useRef } from "react";

function AudioButton() {
  const [downloadLink, setDownloadLink] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const fileInputRef = useRef(null);

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("audio", file);

      fetch("http://141.148.238.92:5000/compress-audio", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((text) => {
          setAudioName(file.name);
          setDownloadLink("success");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  const handleDownload = () => {
    if (downloadLink === "success" && audioName) {
      fetch(`http://localhost:5000/compressed_audio.mp3?fileName=${audioName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "compressed_audio.mp3");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          // Reset state after successful download
          setDownloadLink(null);
          setAudioName(null);
          // Reset file input value to allow selecting the same file again
          fileInputRef.current.value = null;
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    }
  };

  return (
    <div className="flex-col items-center justify-center">
      <label htmlFor="audio-upload" className="button">
        Upload Audio
      </label>
      <input
        ref={fileInputRef}
        id="audio-upload"
        type="file"
        accept=".mp3"
        onChange={uploadFile}
        style={{ display: "none" }}
      />
      <br />

      {downloadLink === "success" && (
        <button onClick={handleDownload} className="button text-xs mr-2 mb-2">
          Download Compressed Audio
        </button>
      )}
    </div>
  );
}

export default AudioButton;
