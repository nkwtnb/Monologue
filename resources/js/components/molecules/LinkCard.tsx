import styled from "styled-components";

interface Props {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const SIZE = {
  HEIGHT: 300,
}

interface ImageProps {
  image: string;
  radius?: {
    [key: string]: string,
  } | undefined
}

const LinkCardArea = styled.div`
width: 100%;
&:hover { 
  cursor: pointer;
}
`;

const Image = styled.div<ImageProps>`
width: 100%;
height: ${SIZE.HEIGHT}px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
border: 1px solid #ddd;
background-image: url(${({ image }) => image});
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
`;

const Title = styled.div`
border-right: 1px solid #ddd;
border-left: 1px solid #ddd;
border-bottom: 1px solid #ddd;
background-color: none;
transition: background-color 0.2s;
padding: 4px;
font-size: 16px;
font-weight: bold;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}

${LinkCardArea}:hover &{ 
  cursor: pointer;
  background-color: #0000000d;
  transition: background-color 0.2s;
}
`;

const Description = styled.div`
border-right: 1px solid #ddd;
border-left: 1px solid #ddd;
border-bottom: 1px solid #ddd;
background-color: none;
transition: background-color 0.2s;
padding: 4px;
font-size: 14px;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;

${LinkCardArea}:hover &{ 
  cursor: pointer;
  background-color: #0000000d;
  transition: background-color 0.2s;
}
`;

const Link = styled.a`
  text-decoration: none;
`;

export default (props: Props) => {
  return (
      <LinkCardArea className="mt-2 mb-2 container">
        <Link href={props.url} target="_blank" className="text-reset">
        <div className="row">
          <div className="col px-0">
            <Image image={props.thumbnail} />
          </div>
        </div>
        <div className="row">
          <div className="col px-0">
            <Title>{props.title}</Title>
          </div>
        </div>
        <div className="row">
          <div className="col px-0">
            <Description>{props.description}</Description>
          </div>
        </div>
        </Link>
      </LinkCardArea>
  )
}