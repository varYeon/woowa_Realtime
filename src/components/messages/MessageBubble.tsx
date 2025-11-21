"use client";

import { useState } from "react";

export default function MessageBubble() {
  const [isMine, setIsMine] = useState(true);
  const dummyMessage: Message[] = [
    {
      id: 1,
      nickname: "kim",
      content: "자니..?",
      created: "11:22",
      roomId: 1,
    },
    {
      id: 1,
      nickname: "kim",
      content: "보고싶다...",
      created: "11:23",
      roomId: 1,
    },
    {
      id: 2,
      nickname: "me",
      content:
        "뭐야 꺼져요 요르르르를를ㄹㄹㄹㄹㄹㄹㄹ를르르ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ르ㅡㅡ르르르르르르",
      created: "12:04",
      roomId: 1,
    },
  ];

  const bubbleClass = "flex gap-2 m-2 justify-start items-end";
  const timeClass = "text-sm text-gray-700 whitespace-nowrap";
  const contentClass = `${
    isMine ? "bg-indigo-900/40" : "bg-white/40"
  } max-w-2/3 min-h-10 rounded-b-xl rounded-l-xl p-2 text-sm break-words shadow-xl`;

  return (
    <>
      {/* notMine */}
      {!isMine && (
        <div key={dummyMessage[0].id} className={bubbleClass}>
          <p className={contentClass}>{dummyMessage[0].content}</p>
          <span className={timeClass}>{dummyMessage[0].created}</span>
        </div>
      )}

      {/* isMine */}
      {isMine && (
        <div
          key={dummyMessage[2].id}
          className="flex gap-2 m-2 justify-end items-end"
        >
          <span className={timeClass}>{dummyMessage[2].created}</span>
          <p className={contentClass}>{dummyMessage[2].content}</p>
        </div>
      )}
    </>
  );
}
