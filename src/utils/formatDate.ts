import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function formattedRoom(date?: string | null) {
  if (!date) return "";
  return format(new Date(date), "yyyy년 MM월 dd일", { locale: ko });
}

export function formattedMessage(date: string) {
  return format(new Date(date), "HH:mm", { locale: ko });
}
