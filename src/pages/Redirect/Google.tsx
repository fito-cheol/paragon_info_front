import React, { useEffect } from 'react';

export default function RedirectGoogle() {
  useEffect(() => {
    // get the URL parameters which will include the auth token
    const { hash } = window.location;

    if (window.opener) {
      window.opener.postMessage(hash);
      window.close();
    }
  }, []);

  return <h2>Please wait...</h2>;
}
