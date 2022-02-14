export interface Entry {
  name: string,
  id: number,
  avatar: string,
  words: string;
  images: string[];
  created_at: string;
  likes: number;
  like: boolean;
  replyCount: number;
}
