import styled from "styled-components";

interface Props { 
  images: (string | undefined)[]
}

const BORDER_RADIUS = [
  {
    key: "borderTopLeftRadius",
    value: "10px"
  },
  {
    key: "borderTopRightRadius",
    value: "10px"
  },
  {
    key: "borderBottomLeftRadius",
    value: "10px"
  },
  {
    key: "borderBottomRightRadius",
    value: "10px"
  },
];

const Image = styled.div`
width: 300px;
height: 200px;
border: 1px solid #ddd;
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
&:hover { 
  cursor: pointer;
  border: 2px solid #ddd;
  box-shadow: 2px 2px 2px #ddd;
  transition: box-shadow 0.2s;
}
`;

export default (props: Props) => {

  const handleClick = (imageUrl: string | undefined) => {
    const url = imageUrl;
    window.open(url, '_blank')
  }

  return (
    <>
      <div className="container mt-2 mb-2">
        <div className="row">
        {
          props.images.map((image, index) => {
            return (
              <div key={index} className={"col-6 px-0 d-flex" + " " + (index % 2 === 0 ? "justify-content-end" : "justify-content-start")}>
                <Image style={{backgroundImage: `url(${image})`, [BORDER_RADIUS[index].key]: BORDER_RADIUS[index].value}} onClick={(() => handleClick(image))} />
              </div>
            )
          })
        }
        </div>
      </div>
    </>
  );
} 