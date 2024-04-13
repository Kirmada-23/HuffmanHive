import Image from "./Image";
import Video from "./Video";
import Audio from "./Audio";
import ChangeTheme from "./ChangeTheme";
import Welcome from "./Welcome";
import "./index.css";
import Components from "./Components";

function App() {
  return (
    <div className="text-3xl font-bold text-center mt-10">
      HuffmanHive
      <div>
        <Welcome />
      </div>
      <div className="flex justify-center m-50 mt-20">
        <ChangeTheme />
        <div className="mr-5">
          <Image />
        </div>
        <div className="ml-5">
          <Video />
        </div>
        <div className="ml-5">
          <Audio />
        </div>
      </div>
      <div>
        <Components />
      </div>
    </div>
  );
}

export default App;
