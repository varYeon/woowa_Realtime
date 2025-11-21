import { Send } from "lucide-react";

export default function NicknameInput() {
  return (
    <>
      <div className="h-screen flex justify-center">
        <div className="flex flex-col gap-3 justify-center">
          <span className="flex flex-col items-center">
            Please enter your nickname.
          </span>
          <div className="flex bottom-0 p-5 rounded-xl bg-white/40 shadow-xl h-2 items-center mb-70">
            <input
              placeholder="nickname"
              className="w-full p-2 outline-none"
            ></input>
            <Send />
          </div>
        </div>
      </div>
    </>
  );
}
