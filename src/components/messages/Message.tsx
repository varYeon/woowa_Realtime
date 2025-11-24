"use client";

import MessageBubble from "./MessageBubble";
import MessageBar from "./MessageBar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Message() {
  const { roomId } = useParams() as { roomId: string };
  const [receiver, setReceiver] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceiver = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("posts")
        .select("name")
        .eq("id", roomId)
        .single();

      if (!error && data) {
        setReceiver(data.name);
      }
    };

    fetchReceiver();
  }, [roomId]);

  return (
    <div className="relative">
      {receiver && (
        <>
          <MessageBubble roomId={roomId} receiver={receiver} />
          <MessageBar roomId={roomId} receiver={receiver} />
        </>
      )}
    </div>
  );
}
