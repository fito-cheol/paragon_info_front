import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import ItemList from '../pages/Item/List';
import HeroList from '../pages/Hero/List';
import HeroDetails from '../pages/Hero/Details';
import TestPage from '../pages/Test';
import TierHeroes from 'pages/Tier/Heroes';
import RedirectPage from '../pages/Redirect/Google';
import Write from '../pages/Walkthrough/Write';
import List from '../pages/Walkthrough/List';

import VideoList from 'pages/Video/List';
import Main from 'pages/Home/Main';

export default function Router() {
  return (
    <Routes>
      <Route path='item' element={<ItemList />} />
      <Route path='hero' element={<HeroList />} />
      <Route path='hero/:name' element={<HeroDetails />} />
      <Route path='write' element={<Write />} />
      <Route path='modify/:no' element={<Write />} />
      <Route path='list' element={<List />} />
      <Route path='test' element={<TestPage />} />
      <Route path='redirect' element={<RedirectPage />} />
      <Route path='tier' element={<TierHeroes />} />
      <Route path='youtube' element={<VideoList />} />
      <Route path='' element={<Main />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
