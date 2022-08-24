import { makePathForImage } from "@api/Resources";
import { Entry } from "@interface/Entry";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Media {
  postId: number;
  url: string;
}

const Image = styled.div<{imagePath: string}>`
position: relative;
width: 100%;
height: 100%;
/* height: 300px; */
border: 1px solid #ddd;
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
background-image: url(${({imagePath}) => imagePath});
&:hover { 
  cursor: pointer;
  border: 2px solid #ddd;
  box-shadow: 2px 2px 2px #ddd;
  transition: box-shadow 0.2s;
}
`;

const ImageMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000aa;
  z-index: 10;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
  &:hover {
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
  }
`;

const Label = styled.div`
  color: white;
`

 const ImageWrapper = styled.div`
 position: relative;
 &::before {
  content: "";
  display: block;
  padding-top: 100%;
 }
`;

const ImageArea = styled.div`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
`

export default (props: any) => {
  const { name } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [postedImages, setPostedImages] = useState<Media[]>([]);

  useEffect(() => {
    setIsLoaded(false);
    (async () => {
      const posts = (await axios.get(`/api/words/user/${name}/posts`)).data;
      const _images: Media[] = [];
      posts.forEach((post: Entry) => {
        post.images.forEach(image => {
          _images.push({
            postId: post.id,
            url: image,
          });
        });
      });
      setPostedImages([..._images]);
      setIsLoaded(true);
    })();
  }, []);
  if (!isLoaded) {
    return <></>;
  }
  return (
    <>
    {
      postedImages.length === 0
      ?
        <div>画像の投稿がありません</div>
      :
        postedImages.map((postedImage, index) => (
          <ImageWrapper key={index} className="col-4 px-0">
            <ImageArea>
              <Link to={"/post/" + postedImage.postId}>
                <ImageMask>
                  <Label className="label">aaaa</Label>
                </ImageMask>
              </Link>
              <Image imagePath={makePathForImage(postedImage.url, "upfiles")}/>
            </ImageArea>
          </ImageWrapper>
        ))
    }
    </>
  );
}