"use client";

import { useEffect } from "react";
import { supabase } from "./utils/supabase/supabase";

export default function Home() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from("posts").select("*").limit(1);

      console.log("data:", data);
      console.log("error:", error);
    };
    test();
  }, []);

  return <div>연결 테스트 중...</div>;
}
