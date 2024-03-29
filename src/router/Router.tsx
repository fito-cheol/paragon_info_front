import NotionHero from 'pages/Notion/Hero';
import NotionList from 'pages/Notion/List';
import React, { lazy, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

const ItemList = lazy(() => import('pages/Item/List'));
const HeroList = lazy(() => import('pages/Hero/List'));
const HeroDetails = lazy(() => import('pages/Hero/Details'));
const TestPage = lazy(() => import('pages/Test'));
const TierHeroes = lazy(() => import('pages/Tier/Heroes'));
const RedirectPage = lazy(() => import('pages/Redirect/Google'));
const Write = lazy(() => import('pages/Walkthrough/Write'));
const List = lazy(() => import('pages/Walkthrough/List'));

const VideoList = lazy(() => import('pages/Video/List'));
const Main = lazy(() => import('pages/Home/Main'));
const GoogleMapRestaurant = lazy(() => import('pages/GoogleMap/Restaurant'));

const renderLoader = () => <p>Loading</p>;

export default function Router() {
  return (
    <Suspense fallback={renderLoader()}>
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
        <Route path='food' element={<GoogleMapRestaurant />} />
        <Route path='walkthrough' element={<NotionList />} />
        <Route path='walkthrough/:notionId' element={<NotionHero />} />
        <Route path='' element={<NotionList />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Suspense>
  );
}
