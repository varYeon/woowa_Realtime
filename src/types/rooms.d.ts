export type Room = Database["public"]["Tables"]["posts"]["Row"];

export type LastComment = {
  content: string;
  created_at: string;
};
