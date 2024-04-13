import AudioButton from "./AudioButton";

function Audio() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <img src="/audio.png" height="100px" width="100px" alt="Profile Icon" />
        <AudioButton />
      </div>
    </div>
  );
}

export default Audio;
