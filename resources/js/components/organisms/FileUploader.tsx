import React, { useRef } from 'react';
import styled from 'styled-components';

interface Props {
  acceptType: string[]
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileControlButton = styled.span`
border: 1px solid #ddd;
padding: 4px 12px;
border-radius: 4px;
font-size: 12px;
color: white;
`;

const FileUploaderLabel = styled.span`
display: inline-block;
font-size: 13px;
white-space: nowrap;
`;

export const FileUploader = (props: Props) => {
  const fileElementRef = useRef<HTMLInputElement>(null);

  const triggerUpload = () => {
    fileElementRef.current?.click();
  }
  
  return (
    <a>
      <FileControlButton className="file-upload btn btn-info" onClick={triggerUpload} >参照</FileControlButton>
      <FileUploaderLabel>png,jpeg,jpg,gif形式（100KBまで）</FileUploaderLabel>
      <div className='file-upload-wrapper' hidden>
        <input type="file" accept={"." + props.acceptType.join(", .")} onChange={props.onChange} ref={fileElementRef}></input>
      </div>
    </a>
  )
}