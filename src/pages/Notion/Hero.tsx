import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-notion/src/styles.css';
import "prismjs/themes/prism-tomorrow.css"; // only needed for code highlighting
import './notion.css';

import { useTheme } from '@mui/material/styles';
import { NotionRenderer } from 'react-notion';

type NotionDict = {
  [index: string]: string;
};
const notionId: NotionDict = {
  adel: '57a2825734c146559f763fa42c64a583',
};
export default function NotionHero() {
  const theme = useTheme();
  const [response, setResponse] = useState({});
  const { name } = useParams();

  useEffect(() => {
    // 두번째 방법
    const NOTION_PAGE_ID = '57a2825734c146559f763fa42c64a583';
    fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
      .then(res => res.json())
      .then(resJson => {
        setResponse(resJson);
      });
  }, []);
  const divStyle = {
    WebkitTextFillColor: "white",
    backgroundColor:"none" 
  };
  return (
    <div className='App' style={theme.palette.mode === 'dark' ? divStyle: {}}>
      <NotionRenderer
        // blockMap={staticResponse}
        blockMap={response}
        fullPage={true}
      />
    </div>
  );
}
