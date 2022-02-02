import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/app.css";
interface Props {
  icon: any;
  id: number;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className: string;
}

export default (props: Props) => {
  return (
    <>
      <div style={{ "color": "#e700a0" }}>  
        <div onClick={props.onClick}>
          <FontAwesomeIcon icon={props.icon} className={props.className}></FontAwesomeIcon>
        </div>
      </div>
    </>
  );
}