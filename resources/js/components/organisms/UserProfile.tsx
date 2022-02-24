import { User } from "@interface/User";
import { makePathForImage } from "@api/Resources";
import styled from "styled-components";
interface Props { 
  user: User | undefined
}

const UserName = styled.div`
  position: relative;
  font-size: 30px;
  font-weight: Bold;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1px;
    margin: 0 auto;
    text-align: center;
    background: linear-gradient(to right, #ddd 0%, #ddd 50%, transparent 100%);  
  }
`;

const Message = styled.div`
  font-size: 16px;
  white-space: break-spaces;
  word-break: break-all;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  border: 1px solid #ddd;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const SIZE = {
  THUMBNAIL_W: "140px"
}

export default (props: Props) => {

  return (
    <Wrapper className='container-fluid'>
      <div className="row" style={{ height: "200px" }}>
        <div className="col-1 d-flex align-items-center justify-content-center" style={{"minWidth": SIZE.THUMBNAIL_W, "boxSizing": "content-box"}}>
          <div style={{ width: SIZE.THUMBNAIL_W, height: SIZE.THUMBNAIL_W }}>
            <img src={props.user?.avatar} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
        <InfoWrapper className="col flex-grow-1">
          <UserName className="mb-1">{props.user?.name}</UserName>
          <Message>{props.user?.message}</Message>
        </InfoWrapper>
      </div>
    </Wrapper>
  );
}