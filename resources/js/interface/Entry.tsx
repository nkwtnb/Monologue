export interface Entry {
  name: string,
  id: number,
  avatar: string,
  words: string;
  ogp_title: string;
  ogp_description: string;
  ogp_image: string;
  images: string[];
  created_at: string;
  likes: number;
  isLike: boolean;
  replyCount: number;
}
