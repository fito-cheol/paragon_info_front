import React from 'react';
import { Route } from 'react-router';

// It should not contain:
// redirecting URLs
// duplicate URLs
// error URLs
export default (
  <Route>
    <Route path='item' />
    <Route path='hero' />
    <Route path='hero/:name' />
    <Route path='write' />
    <Route path='modify/:no' />
    <Route path='list' />
    <Route path='test' />
    <Route path='tier' />
    <Route path='youtube' />
    <Route path='' />
    <Route />
  </Route>
);
