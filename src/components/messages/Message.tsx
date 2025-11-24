"use client";

import MessageBubble from "./MessageBubble";
import MessageBar from "./MessageBar";
import { useParams } from "next/navigation";

export default function Message() {
  const { roomId } = useParams() as { roomId: string };

  return (
    <div className="relative">
      <MessageBubble roomId={roomId} />
      <MessageBar roomId={roomId} />
    </div>
  );
}
