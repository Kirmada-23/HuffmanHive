import VideoButton from "./videobutton";

function Video() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <img src="/video.png" height="100px" width="100px" alt="Profile Icon" />
        <VideoButton />
      </div>
    </div>
  );
}

export default Video;
