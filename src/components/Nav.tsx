"use client";

import { MessageCircleMoreIcon, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const ButtonClass =
    "h-10 w-40 rounded-xl bg-white/10 flex justify-center items-center hover:bg-gray-400 shadow-xl";

  const clickRoomsHandler = () => {
    router.push("/rooms");
  };
  const clickUsersHandler = () => {
    router.push("/users");
  };

  return (
    <div className="flex gap-10 justify-center absolute bottom-0 w-full mb-5">
      <div className={ButtonClass} onClick={clickRoomsHandler}>
        <MessageCircleMoreIcon />
      </div>
      <div className={ButtonClass} onClick={clickUsersHandler}>
        <User />
      </div>
    </div>
  );
}
