"use client";

import { Message } from "@/types/Message";
import { formattedMessage } from "@/utils/formatDate";
import { createClient } from "@/utils/supabase/client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MessageBubble({ roomId }: { roomId: string }) {
  const router = useRouter();
  const [isMine, setIsMine] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const bubbleClass = "flex gap-2 m-2 justify-start items-end";
  const timeClass = "text-sm text-gray-700 whitespace-nowrap";
  const contentClass = `${
    isMine ? "bg-indigo-900/40" : "bg-white/40"
  } max-w-2/3 min-h-10 rounded-b-xl rounded-l-xl p-2 text-sm break-words shadow-xl`;

  const backHandler = () => {
    router.push("/rooms");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Data error:", error.message);
        return null;
      }

      if (!error) setMessages(data ?? []);
      console.log(data); // 담겼는데
      console.log(messages); // 안 담겼다 : set이 적용되는 시점은 다음 렌더링
    };

    fetchMessages();
  }, []);

  return (
    <>
      {messages.map((message) => (
        <>
          <div className="flex gap-3 p-2" onClick={backHandler}>
            <ChevronLeft className="cursor-pointer" />
            <span className="text-shadow-xs">{message.nickname}</span>
          </div>
          {/* notMine */}
          {!isMine && (
            <div key={message.id} className={bubbleClass}>
              <p className={contentClass}>{message.content}</p>
              <span className={timeClass}>
                {formattedMessage(message.created_at)}
              </span>
            </div>
          )}

          {/* isMine */}
          {/* 닉네임 없다 */}
          {isMine && (
            <div
              key={message.id}
              className="flex gap-2 m-2 justify-end items-end"
            >
              <span className={timeClass}>
                {formattedMessage(message.created_at)}
              </span>
              <p className={contentClass}>{message.content}</p>
            </div>
          )}
        </>
      ))}
    </>
  );
}
