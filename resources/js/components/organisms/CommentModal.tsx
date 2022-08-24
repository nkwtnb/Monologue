declare var bootstrap: any;
declare var jQuery: any;
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../atoms/Modal";
import NewPost from "./NewPost";
import Post from "./Post";
import { Entry } from "@interface/Entry";

export default () => {
  const reactLocation = useLocation();
  const navigate = useNavigate();
  const [postState, setPostState] = useState<Entry | null>(null);

  jQuery(document).off("hidden.bs.modal", `#comment-modal`);
  jQuery(document).on("hidden.bs.modal", `#comment-modal`, (e: any) => {
    // ハッシュが残っている場合、ダイアログクローズ（＝戻るなどではなく）の為、URLの移動をする
    if (reactLocation.hash) {
      // stateが保持されている場合、コメントボタンなどからの正しい操作
      if (reactLocation.state) {
        navigate(-1);
      } else {
        // stateが保持されていない場合、直リンクの為、指定パスへ遷移
        navigate(reactLocation.pathname, { replace: false });
      }
    }
  });

  useEffect(() => {
    const postProps: any = reactLocation.state;
    if (postProps) {
      setPostState({...postProps});
    } else {
      setPostState(null);
    }
  }, [reactLocation]);

  useLayoutEffect(() => {
    // モーダルインスタンス初回のみ生成
    if (!window.__modal) {
      window.__modal = new bootstrap.Modal(document.getElementById("comment-modal"));
    }
    // コメント登録用Hash（#comment）の場合、ダイアログ表示
    if (reactLocation.hash.indexOf("#/comment") > -1) {
      // TODO poststateが空の場合、APIでpost info 取得してセット
      window.__modal.show();
    } else {
      window.__modal.hide();
    }
  }, [reactLocation]);

  return (
    <>
      <Modal {...postState} title={"コメントの投稿"} >
        {
          postState && 
          <>
            <div>
              <Post {...postState} isDialog={true} ></Post>
            </div>
            <div className="mt-2">
              <NewPost placeholder="コメントを投稿..." replyTo={postState.id} />
            </div>
          </>
        }
      </Modal>
    </>
  );
} 