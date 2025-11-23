import { createClient } from "@/utils/supabase/client";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function MessageBar() {
  const [message, setMessage] = useState("");
  const { roomId } = useParams() as { roomId: string };

  const messageHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const supabase = await createClient();

    await supabase.from("messages").insert([
      {
        room_id: roomId,
        nickname: localStorage.getItem("nickname") ?? "",
        content: message,
      },
    ]);

    setMessage("");
  };

  return (
    <form
      className="flex fixed bottom-25 w-96 p-5 mx-2 rounded-xl bg-white/40 shadow-xl h-2 items-center"
      onSubmit={messageHandler}
    >
      <input
        placeholder="Send your message ..."
        className="w-full p-2 outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button type="submit">
        <Send />
      </button>
    </form>
  );
}
