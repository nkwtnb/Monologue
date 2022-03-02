import { PropsWithChildren } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface Props {
  title: string;
  approve?: string;
  cancel?: string;
  id?: number;
}

export default (props: PropsWithChildren<Props>) => {
  const navigate = useNavigate();
  const reactLocation = useLocation();
  return (
    <>
      <div className="modal fade" id="comment-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}