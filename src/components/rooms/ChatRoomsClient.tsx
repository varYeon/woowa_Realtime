"use client";

import { formattedRoom } from "@/utils/formatDate";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ChatRoomsClient() {
  const router = useRouter();
  const [rooms, setRooms] = useState<any[]>([]);
  // [ { id: 1, name: "...", created_at: "..."}, ... ]
  // 두 번째 useEffect 이후에 :: [ { id: 1, name: "...", created_at: "...", content: "..."}, ... ]

  // 처음 한 번만 실행
  useEffect(() => {
    const fetchRooms = async () => {
      const supabase = await createClient();
      const { data: room, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("data:", room);
      console.log("error:", error);
      console.log("rooms state:", rooms);

      if (error) {
        console.error("Data error:", error.message);
        return null;
      }

      if (!error) setRooms(room ?? []);
      // 이후의 map의 에러를 방지하기 위해 데이터가 없을 때 null을 빈배열로 교체
    };

    fetchRooms();
  }, []);

  // rooms가 준비되는 시점에 최신 메세지를 불러옴 (roomId가 필요하기 때문)
  useEffect(() => {
    if (rooms.length === 0) return;

    const fetchLastComment = async () => {
      const supabase = createClient();

      const updatedRooms = await Promise.all(
        rooms.map(async (room) => {
          const { data: comment, error } = await supabase
            .from("messages")
            .select("content")
            .eq("room_id", room.id)
            .order("created_at", { ascending: false })
            .limit(1);

          if (error) {
            console.error("Data error:", error.message);
            return room;
          }

          return { ...room, comment: comment?.[0] ?? null };
        })
      );

      setRooms(updatedRooms);
    };

    fetchLastComment();
  }, [rooms]);

  const handleClick = (id: string) => {
    router.push(`/rooms/${id}`);
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
            <span>{formattedRoom(room.created_at)}</span>
          </div>
          <div className="flex justify-between">
            <p className="w-full truncate">
              {room.content ?? "채팅을 시작해보세요"}
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
