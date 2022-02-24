import { PropsWithChildren, useContext } from "react";
import Modal from "../molecules/Modal";
import NewPost from "./NewPost";
import Post from "./Post";
import { AuthContext } from "../../Context";
import { Entry } from "@interface/Entry";

export default (props: PropsWithChildren<Entry>) => {
  const { authState } = useContext(AuthContext);
  return (
    <Modal title="コメントの投稿" id={props.id}>
      <div>
        <Post onDialog={true} {...props}></Post>
      </div>
      {/* ログイン済みの場合のみ表示 */}
      {
      authState.name !== "" &&
        <div className="mt-2">
          <NewPost caption="コメントを投稿..." replyTo={props.id} />
        </div>
      }
    </Modal>
  )
}