import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import HeroDict from 'assets/hero/heroDict';

import ImageHeroBg from 'assets/hero/imagePreloaderHeroBackground';
import ImageHeroSkill from 'assets/hero/imagePreloaderSkill';
import ImageHeroTypes from 'assets/hero/imagePreloaderType';

import './Details.scoped.scss';

export default function Details() {
  const { name } = useParams();
  const [hero, setHero] = useState<Hero | null>(null);
  const getHero = async (name: string) => {
    setHero(HeroDict[name]);
  };

  useEffect(() => {
    if (name) getHero(name);
  }, []);

  return (
    <div>
      {hero ? (
        <div className='container'>
          <div className='heroPages'>
            <div className='heroDetails'>
              <div className='heroInfoBg'></div>
              <div className='heroImage'>
                <img src={ImageHeroBg[hero.name]} />
              </div>
              <div className='content'>
                <div className='heroStroy'>
                  <h1 className='title'>{hero.이름}</h1>
                  <hr />
                  <div className='rowItem'>
                    <img src={ImageHeroTypes[hero.category]} height={52} />
                    <h3 className='subTitle'>{hero.category}</h3>
                  </div>
                  <span className='description'>{hero.story}</span>
                </div>
              </div>
              <div className='heroInfo'>
                <ul className='info'>
                  <li className='tab'>
                    <span className='leftText'>행성</span>
                    <span className='rightText'>{hero.planet}</span>
                  </li>
                  <li className='tab'>
                    <span className='leftText'>출신</span>
                    <span className='rightText'>{hero.ancestry}</span>
                  </li>
                  <li className='tab'>
                    <span className='leftText'>소속</span>
                    <span className='rightText'>{hero.affiliation}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='heroSkill'>
              <ul className='left tab'>
                <li className='tabItem'>
                  <img height={60} src={ImageHeroSkill[`${hero.name}_Q`]} />
                </li>
                <li className='tabItem'>
                  <img height={60} src={ImageHeroSkill[`${hero.name}_E`]} />
                </li>
                <li className='tabItem'>
                  <img height={60} src={ImageHeroSkill[`${hero.name}_R`]} />
                </li>
                <li className='tabItem'>
                  <img height={60} src={ImageHeroSkill[`${hero.name}_LEFT`]} />
                </li>
                <li className='tabItem'>
                  <img height={60} src={ImageHeroSkill[`${hero.name}_RIGHT`]} />
                </li>
              </ul>
              <div className='right'>content</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
