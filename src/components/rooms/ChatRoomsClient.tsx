import { createClient } from "@/utils/supabase/client";

export default async function ChatRoomsClient() {
  const supabase = await createClient();

  // 처음 한 번만 실행
  const { data: rooms, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Data error:", error.message);
    return <div>데이터를 불러오는 도중에 오류가 발생했습니다.</div>;
  }

  // roomId 별로 실행
  // const lastComment = async (roomId: string) => {
  //   const { data: comment, error } = await supabase
  //     .from("messages")
  //     .select("content, created_at")
  //     .eq("room_id", roomId)
  //     .order("created_at", { ascending: false })
  //     .limit(1);

  //   if (error) {
  //     console.error("Data error:", error.message);
  //     return <div>데이터를 불러오는 도중에 오류가 발생했습니다.</div>;
  //   }

  //   return comment?.[0];
  // };

  return (
    <div className="flex flex-col gap-2">
      {rooms.map((post) => (
        <div className="cursor-pointer hover:bg-gray-400 rounded-xl p-3 flex flex-col gap-3">
          <div key={post.id} className="flex justify-between">
            <span>{post.name}</span>
            <span>{post.created_at}</span>
          </div>
          <div className="flex justify-between">
            <p className="w-full truncate">ㅊ</p>
            <div className="bg-orange-600 rounded-4xl h-5.5 w-6 flex flex-col justify-center items-center">
              1
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
