declare var jQuery: any;
declare var bootstrap: any;
import { PropsWithChildren, useEffect, useLayoutEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface Props {
  title: string;
  approve?: string;
  cancel?: string;
  id: number;
}

// export const closeDialogIfLeave = (hash: string) => {
//   console.log("hash : " + hash);
//   if (hash.indexOf("#comment") === -1) {
//     console.log("close");
//     // var myModalEl = document.querySelectorAll(".modal.show");
//     // var modal = bootstrap.Modal.getInstance(myModalEl[0])
//     // console.log(modal);
//     jQuery(".modal.show").hide();
//     jQuery(".modal-backdrop.show").hide();
//     // modal-backdrop fade show
//   }
// }

export default (props: PropsWithChildren<Props>) => {
  const navigate = useNavigate();
  const reactLocation = useLocation();
  // console.log("effect");
  // jQuery(document).off("hide.bs.modal", `#exampleModal-${props.id}`);
  // jQuery(document).on("hide.bs.modal", `#exampleModal-${props.id}`, (e: any) => {
  //   console.log("close event");
  //   navigate(reactLocation.pathname, {replace: false });
  // });
  return (
    <>
      {/* <button id={"toggle-modal-" + props.id} type="button" className="btn btn-primary" data-toggle="modal" data-target={"#exampleModal-" + props.id} data-bs-target="#comment" hidden></button> */}
      <div className="modal fade" id={"comment-modal"} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">{props.cancel}</button>
              <button type="button" className="btn btn-primary">{props.approve}</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}