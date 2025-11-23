import ChatRoomsClient from "@/components/rooms/ChatRoomsClient";
import SearchBar from "@/components/SearchBar";

export default function RoomsPage() {
  return (
    <>
      <SearchBar />
      <ChatRoomsClient />
    </>
  );
}
