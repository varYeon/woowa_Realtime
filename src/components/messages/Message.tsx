"use client";

import { ChevronLeft } from "lucide-react";
import MessageBubble from "./MessageBubble";
import MessageBar from "./MessageBar";
import { useRouter } from "next/navigation";

export default function Message() {
  const router = useRouter();

  const backHandler = () => {
    router.push("/rooms");
  };

  return (
    <>
      <div className="flex gap-3 p-2" onClick={backHandler}>
        <ChevronLeft className="cursor-pointer" />
        <span className="text-shadow-xs">nickname</span>
      </div>
      <MessageBubble />
      <MessageBar />
    </>
  );
}
