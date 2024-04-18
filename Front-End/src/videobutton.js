import React, { useState } from "react";

function VideoButton() {
  const [downloadLink, setDownloadLink] = useState(null);
  const [videoName, setVideoName] = useState(null); // State to store the video file name

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("video", file);

      fetch("https://comp-lucifer.alchemist.cyou/compress-video", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text(); // Read response as text
        })
        .then((text) => {
          setVideoName(text); // Set video name received from server
          setDownloadLink("success");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  const handleDownload = () => {
    if (downloadLink === "success" && videoName) {
      fetch(`http://localhost:5000/compressed_video.mp4?fileName=${videoName}`)
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
          link.setAttribute("download", "compressed_video.mp4");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Reset state after download
          setDownloadLink(null);
          setVideoName(null);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    }
  };

  return (
    <div className="flex-col items-center justify-center">
      <label htmlFor="video-upload" className="button">
        Upload Video
      </label>
      <input
        id="video-upload"
        type="file"
        accept=".mp4"
        onChange={uploadFile}
        style={{ display: "none" }}
      />
      <br />
      {downloadLink === "success" && (
        <button onClick={handleDownload} className="button text-xs mr-2 mb-2">
          Download Compressed Video
        </button>
      )}
    </div>
  );
}

export default VideoButton;
