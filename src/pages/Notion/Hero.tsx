import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-notion/src/styles.css';
import "prismjs/themes/prism-tomorrow.css"; // only needed for code highlighting
import './notion.css';

import { useTheme } from '@mui/material/styles';
import { NotionRenderer } from 'react-notion';

export default function NotionHero() {
  const theme = useTheme();
  const [response, setResponse] = useState({});
  const { notionId } = useParams();

  useEffect(() => {
    fetch(`https://notion-api.splitbee.io/v1/page/${notionId}`)
      .then(res => res.json())
      .then(resJson => {
        setResponse(resJson);
      });
  }, []);
  const divStyle = {
    WebkitTextFillColor: "white",
    backgroundColor:"none",
    minHeight:"100vh"
  };
  return (
    <div className='App' style={theme.palette.mode === 'dark' ? divStyle: {minHeight:"100vh"}}>
      <NotionRenderer
        blockMap={response}
        fullPage={true}
      />
    </div>
  );
}
