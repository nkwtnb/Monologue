import React from "react";
import styled from "styled-components";
import PostedImage from "../atoms/PostedImage";

interface Props { 
  images: (string | undefined)[]
}

interface ImageColumn {
  image: string;
  heightTimes: number;
  widthTimes: number;
  radius: ({
    [key: string]: string,
  }) | undefined
}

const BORDER_RADIUS = {
  "KEY": [
    "border-top-left-radius",
    "border-bottom-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
  ],
  "VALUE": "20px"
}
const setRadius = (imageLength: number, index: number) => {
  switch(imageLength) {
    case 1:
      // radius は 4角
      return {
        [BORDER_RADIUS.KEY[0]]: BORDER_RADIUS.VALUE,
        [BORDER_RADIUS.KEY[1]]: BORDER_RADIUS.VALUE,
        [BORDER_RADIUS.KEY[2]]: BORDER_RADIUS.VALUE,
        [BORDER_RADIUS.KEY[3]]: BORDER_RADIUS.VALUE,
      }
    case 2:
      if (index === 0) {
        return {
          [BORDER_RADIUS.KEY[0]]: BORDER_RADIUS.VALUE,
          [BORDER_RADIUS.KEY[1]]: BORDER_RADIUS.VALUE,
        };
      } else {
        return {
          [BORDER_RADIUS.KEY[2]]: BORDER_RADIUS.VALUE,
          [BORDER_RADIUS.KEY[3]]: BORDER_RADIUS.VALUE,
        };
      }
    case 3:
      if (index === 0) {
        return {
          [BORDER_RADIUS.KEY[0]]: BORDER_RADIUS.VALUE,
          [BORDER_RADIUS.KEY[1]]: BORDER_RADIUS.VALUE,
        };
      } else if (index === 1) {
        return {
          [BORDER_RADIUS.KEY[2]]: BORDER_RADIUS.VALUE,
        };
      } else {
        return {
          [BORDER_RADIUS.KEY[3]]: BORDER_RADIUS.VALUE,
        };
      }
    case 4:
      return {
        [BORDER_RADIUS.KEY[index]]: BORDER_RADIUS.VALUE,
      };
  }
};

export default (props: Props) => {
  const columns = (() => {
    let rows: ImageColumn[] = [];      // 画像表示エリアの列内の行
    let columns: ImageColumn[][] = []; // 画像表示エリアの列
    props.images.forEach((image, index) => {
      if (!image) {
        return;
      }
      rows.push({
        image: image,
        heightTimes: (props.images.length === 1 || (props.images.length === 3 && index === 0)) ? 2 : 1,
        widthTimes: (props.images.length === 1) ? 2 : 1,
        radius: setRadius(props.images.length, index)
      });
      if (((props.images.length === 2 || props.images.length === 3) && index === 0) ||  // 画像数が2,3の時は1個目を格納したらブレーク
      (props.images.length === 4 && index === 1)) {                                     // 画像数が4の時は2個目を格納したらブレーク
        columns.push(rows);
        rows = [];
      }
    })
    columns.push(rows);
    return columns;
  })();

  const handleClick = (imageUrl: string | undefined) => {
    const url = imageUrl;
    window.open(url, '_blank')
  }

  const classNames = (() => {
    const classes = [
      "px-0",
      "d-flex",
      "flex-column",
    ];

    // 画像が1つの場合は2カラム分
    if (columns.length === 1 && columns[0].length === 1) {
      classes.push("col-12");
    } else {
      classes.push("col-6");
    }
    return classes;
  })();

  const getJustifyAndAlign = (columns: ImageColumn[][], index: number) => {
    if (columns.length === 1 && columns[0].length === 1) {
      return "justify-content-center align-items-center";
    }
    if (index === 0) {
      return "justify-content-end align-items-end";
    } else {
      return "justify-content-start align-items-start";
    }
  }

  return (
    <>
      <div className="container mt-2 mb-2">
        <div className="row">
        {
          columns.map((column, index) => (
            <div key={index} className={classNames.join(" ") + " " + getJustifyAndAlign(columns, index)}>
              {
                column.map((value, index) => {
                  return (
                    <PostedImage key={index} image={value.image} heightTimes={value.heightTimes} widthTimes={value.widthTimes} radius={value.radius}/>
                  )
                })
              }
            </div>
          ))
        }
        </div>
      </div>
    </>
  );
} 