import FontAwesomeIcon from "../atoms/FontAwesomeIcon"

interface Props {
  id: number;
  likes: any;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default (props: Props) => {
  let isLiked = false;
  for (let i=0; i<props.likes.length; i++) {
    if (props.likes[i] === props.id) {
      isLiked = true;
    }
  }
  return (
    <div style={{"color": "#e700a0"}}>
      <FontAwesomeIcon fa={[isLiked ? "fas" : "far", "fa-heart", "fa-lg"]} onClick={props.onClick}></FontAwesomeIcon>
    </div>
  )
}