function Components() {
  const power = "./power.png";
  const sheild = "./shield.png";
  const easy = "./easy.png";

  return (
    <div className="flex mt-20 pl-28">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 m-4">
        <div className="px-6 py-4">
          <h4 className="font-bold text-xl mb-2">
            <img src={power} alt="Power" className="w-16 h-16 " />
            Fast Compression
          </h4>
          <p className="text-gray-700 text-base">
            The tool will do everything for you, just upload your file and it'll
            reduce its size and keep quality as much as possible.
          </p>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 m-4">
        <div className="px-6 py-4">
          <h4 className="font-bold text-xl mb-2">
            <img src={sheild} alt="Sheild" className="w-16 h-16" /> Secure
            Encryption
          </h4>
          <p className="text-gray-700 text-base">
            You're the only one who has access to your files because all the
            communications are performed via secure channels.
          </p>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 m-4">
        <div className="px-6 py-4">
          <h4 className="font-bold text-xl mb-2">
            {" "}
            <img src={easy} alt="Easy" className="w-16 h-16" />
            Simple Interface
          </h4>
          <p className="text-gray-700 text-base">
            Don't worry, the tool is really intuitive, you don't even need to
            read a manual to use it!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Components;
