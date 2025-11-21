import { MessageCircleMoreIcon, User } from "lucide-react";

export default function Nav() {
  const ButtonClass =
    "h-10 w-40 rounded-xl bg-white/10 flex justify-center items-center hover:bg-gray-400";
  return (
    <div className="flex gap-10 justify-center absolute bottom-0 w-full mb-5">
      <div className={ButtonClass}>
        <MessageCircleMoreIcon />
      </div>
      <div className={ButtonClass}>
        <User />
      </div>
    </div>
  );
}
