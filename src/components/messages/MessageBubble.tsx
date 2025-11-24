"use client";

import { Message } from "@/types/Message";
import { formattedMessage } from "@/utils/formatDate";
import { createClient } from "@/utils/supabase/client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MessageBubble({
  roomId,
  receiver,
}: {
  roomId: string;
  receiver: string;
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState<string | null>(null);

  const bubbleClass = "flex gap-2 m-2 justify-start items-end";
  const timeClass = "text-sm text-gray-700 whitespace-nowrap";
  const contentClass =
    "max-w-2/3 min-h-10 rounded-b-xl p-2 text-sm break-words shadow-xl";

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
      // console.log(data); // 담겼는데
      // console.log(messages); // 안 담겼다 : set이 적용되는 시점은 다음 렌더링
    };

    fetchMessages();
  }, []);

  // realtime
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel(`room:${roomId}`, {
      config: {
        broadcast: {
          self: true,
        },
      },
    });

    channel.on("broadcast", { event: "new_message" }, ({ payload }) => {
      setMessages((prev) => [...prev, payload]);
    });

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [roomId]);

  useEffect(() => {
    const stored = localStorage.getItem("sender");
    setNickname(stored);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex gap-3 p-2" onClick={backHandler}>
        <ChevronLeft className="cursor-pointer" />
        <span className="text-shadow-xs">{receiver}</span>
      </div>

      {messages.map((message) => {
        const isMine = message.sender === nickname;

        return (
          <div key={message.id}>
            {/* notMine */}
            {!isMine && (
              <>
                <span className="text-sm ml-1.5">{message.sender}</span>
                {/* receiver 아님 */}
                <div className={bubbleClass}>
                  <p
                    className={`${contentClass} bg-indigo-900/40 rounded-r-xl`}
                  >
                    {message.content}
                  </p>
                  <span className={timeClass}>
                    {formattedMessage(message.created_at)}
                  </span>
                </div>
              </>
            )}

            {/* isMine */}
            {isMine && (
              <div
                key={message.id}
                className="flex gap-2 m-2 justify-end items-end"
              >
                <span className={timeClass}>
                  {formattedMessage(message.created_at)}
                </span>
                <p className={`${contentClass} bg-white/40 rounded-l-xl`}>
                  {message.content}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
