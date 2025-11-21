export default function ChatRoomsClient() {
  const dummyPosts = [
    {
      id: 1,
      created: "11월 21일",
      name: "woowa",
      comment: "아 완전 웃겨 ㅋㅋㅋㅋㅋ",
    },
    {
      id: 2,
      created: "11월 20일",
      name: "soo",
      comment: "내일 몇 시에 만날거야?",
    },
    {
      id: 3,
      created: "11월 10일",
      name: "yeon",
      comment: "뭐하냐~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {dummyPosts.map((post) => (
        <div className="cursor-pointer hover:bg-gray-400 rounded-xl p-3 flex flex-col gap-3">
          <div key={post.id} className="flex justify-between">
            <span>{post.name}</span>
            <span>{post.created}</span>
          </div>
          <div className="flex justify-between">
            <p className="w-full truncate">{post.comment}</p>
            <div className="bg-orange-600 rounded-4xl h-5.5 w-6 flex flex-col justify-center items-center">
              1
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
