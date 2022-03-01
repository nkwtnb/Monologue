declare var bootstrap: any;
declare var jQuery: any;
import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../molecules/Modal";

interface Props {
  post?: any;
}

export default (props: Props) => {
  const reactLocation = useLocation();
  const navigate = useNavigate();

  const postProps = reactLocation.state;
  console.log(postProps);
  jQuery(document).off("hidden.bs.modal", `#comment-modal`);
  jQuery(document).on("hidden.bs.modal", `#comment-modal`, (e: any) => {
    // ハッシュが残っている場合、ダイアログクローズ（＝戻るなどではなく）の為、URLの移動をする
    if (reactLocation.hash) { 
      // stateが保持されている場合、コメントボタンなどからの正しい操作
      if (reactLocation.state) {
        navigate(-1);
      } else {
        // stateが保持されていない場合、直リンクの為、指定パスへ遷移
        navigate(reactLocation.pathname, {replace: false});
      }
    }
  });
  useLayoutEffect(() => {
    // モーダルインスタンス初回のみ生成
    if (!window.__modal) {
      window.__modal = new bootstrap.Modal(document.getElementById("comment-modal"));
    }
    // コメント登録用Hash（#comment）の場合、ダイアログ表示
    if (reactLocation.hash.indexOf("#/comment") > -1) {
      window.__modal.show();
    } else {
      window.__modal.hide();
    }
  }, [reactLocation]);

  return (
    <>
      <Modal {...postProps} id={9999} title={"test"}/>
    </>
  );
} 