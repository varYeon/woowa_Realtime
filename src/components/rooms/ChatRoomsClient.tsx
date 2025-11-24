"use client";

import { Room } from "@/types/rooms";
import { formattedRoom } from "@/utils/formatDate";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ChatRoomsClient() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  // [ { id: 1, name: "...", created_at: "..."}, ... ]
  // 두 번째 useEffect 이후에 :: [ { id: 1, name: "...", created_at: "...", content: "..."}, ... ]

  useEffect(() => {
    const fetchRooms = async () => {
      const supabase = createClient();

      const { data: roomData, error: roomError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (roomError || !roomData) {
        console.error("Room fetch error:", roomError?.message);
        return;
      }

      const updatedRooms = await Promise.all(
        roomData.map(async (room) => {
          const { data: comment } = await supabase
            .from("messages")
            .select("content, created_at")
            .eq("room_id", room.id)
            .order("created_at", { ascending: false })
            .limit(1);

          return {
            ...room,
            lastMessage: comment?.[0]?.content ?? null,
            lastMessageTime: comment?.[0]?.created_at ?? null,
          };
        })
      );

      setRooms(updatedRooms);
    };

    fetchRooms();
  }, []);

  const handleClick = (id: string) => {
    const nickname = localStorage.getItem("sender");

    if (!nickname) {
      alert("닉네임 'woowa'를 먼저 입력해주세요!");
      router.push("/users");
    }

    if (nickname) router.push(`/rooms/${id}`);
  };

  return (
    <div className="flex flex-col gap-2">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="cursor-pointer hover:bg-gray-400 rounded-xl p-3 flex flex-col gap-3"
          onClick={() => handleClick(room.id)}
        >
          <div className="flex justify-between">
            <span>{room.name}</span>
            <span>{formattedRoom(room.lastMessageTime)}</span>
          </div>
          <div className="flex justify-between">
            <p className="w-full truncate">
              {room.lastMessage ?? "채팅을 시작해보세요"}
            </p>
            <div className="bg-orange-600 rounded-4xl h-5.5 w-6 flex flex-col justify-center items-center">
              1
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
