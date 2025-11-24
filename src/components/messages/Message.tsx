"use client";

import { ChevronLeft } from "lucide-react";
import MessageBubble from "./MessageBubble";
import MessageBar from "./MessageBar";
import { useParams, useRouter } from "next/navigation";

export default function Message() {
  const router = useRouter();
  const { roomId } = useParams() as { roomId: string };

  const backHandler = () => {
    router.push("/rooms");
  };

  return (
    <div className="relative">
      <div className="flex gap-3 p-2" onClick={backHandler}>
        <ChevronLeft className="cursor-pointer" />
        <span className="text-shadow-xs">nickname</span>
      </div>
      <MessageBubble roomId={roomId} />
      <MessageBar roomId={roomId} />
    </div>
  );
}
