import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import ReactQuerySample from 'components/reactQuerySample';
import { getVideo } from 'api/google/youtube';

export default function Test() {
  const clickHandler = async () => {
    const result = await getVideo({
      part: 'snippet',
      id: 'hfcpJx8J4Bk',
      locale: '대한민국',
      key: 'AIzaSyBGQ9PIYkwxk6iCSstQ5o-Pvt9CPeevzno',
    });
    // The request is missing a valid API key
    console.log('getVideo', result);
  };

  return (
    <Grid container>
      <Grid xs={12}>
        <ReactQuerySample />
        <button onClick={() => clickHandler()}> 유튜브 </button>
      </Grid>
    </Grid>
  );
}
