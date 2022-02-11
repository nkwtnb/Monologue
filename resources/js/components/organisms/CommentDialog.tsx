import { PropsWithChildren } from "react";
import Modal from "../molecules/Modal";
import NewPost from "./NewPost";
import Post from "./Post";

interface Entry {
  name: string,
  id: number,
  avatar: string,
  words: string;
  created_at: string;
  likes: number;
  like: boolean;
} 

export default (props: PropsWithChildren<any>) => {
  return (
    <Modal title="テスト" cancel="キャンセル" approve="投稿" id={props.id}>
      <div>
        <Post onDialog={true} {...props}></Post>
      </div>
      <div className="mt-2">
        <NewPost replyTo={props.id} />
      </div>
    </Modal>
  )
}