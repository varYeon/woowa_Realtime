import { Send } from "lucide-react";

export default function MessageBar() {
  return (
    <div className="flex bottom-0 p-5 mx-2 rounded-xl bg-white/40 shadow-xl h-2 items-center">
      <input
        placeholder="Send your message ..."
        className="w-full p-2  outline-none"
      ></input>
      <Send />
    </div>
  );
}
