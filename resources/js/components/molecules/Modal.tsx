import { PropsWithChildren } from "react"

interface Props {
  title: string;
  approve: string;
  cancel: string;
  id: number;
}

export default (props: PropsWithChildren<Props>) => {
  return (
    <>
      <button id={"toggle-modal-" + props.id} type="button" className="btn btn-primary" data-toggle="modal" data-target={"#exampleModal-" + props.id} hidden></button>
      <div className="modal fade" id={"exampleModal-" + props.id} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">{props.cancel}</button>
              <button type="button" className="btn btn-primary">{props.approve}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}