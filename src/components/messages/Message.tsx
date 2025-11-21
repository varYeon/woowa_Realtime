import { ChevronLeft } from "lucide-react";
import MessageBubble from "./MessageBubble";
import MessageBar from "./MessageBar";

export default function Message() {
  return (
    <>
      <div className="flex gap-3 p-2">
        <ChevronLeft className="cursor-pointer" />
        <span className="text-shadow-xs">nickname</span>
      </div>
      <MessageBubble />
      <MessageBar />
    </>
  );
}
