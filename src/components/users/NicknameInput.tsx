"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export default function NicknameInput() {
  const [nickname, setNickname] = useState("");

  const submitHandler = () => {
    if (!nickname.trim()) return alert("닉네임을 입력해주세요!");
    localStorage.setItem("nickname", nickname);
  };

  return (
    <>
      <div className="h-screen flex justify-center">
        <div className="flex flex-col gap-3 justify-center">
          <span className="flex flex-col items-center">
            Please enter your nickname.
          </span>
          <form
            className="flex bottom-0 p-5 rounded-xl bg-white/40 shadow-xl h-2 items-center mb-70"
            onSubmit={submitHandler}
          >
            <input
              placeholder="nickname"
              className="w-full p-2 outline-none"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></input>
            <button>
              <Send type="submit" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
