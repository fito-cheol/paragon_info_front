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
  const [index, setIndex] = useState(0);
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
                    <img src={ImageHeroTypes[hero.category]} width={52} />
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
              <h1 className='title'>스킬</h1>
              <div className='content'>
                <div className='tab'>
                  <div className='tab__line'></div>
                  <ul className='tab__container'>
                    <li className={index === 0 ? 'tab__image current' : 'tab__image'} onClick={() => setIndex(0)}>
                      <img width={62} src={ImageHeroSkill[`${hero.name}_Q`]} />
                      <div className='pointer__circle'></div>
                    </li>
                    <li className={index === 1 ? 'tab__image current' : 'tab__image'} onClick={() => setIndex(1)}>
                      <img width={62} src={ImageHeroSkill[`${hero.name}_E`]} />
                      <div className='pointer__circle'></div>
                    </li>
                    <li className={index === 2 ? 'tab__image current' : 'tab__image'} onClick={() => setIndex(2)}>
                      <img width={62} src={ImageHeroSkill[`${hero.name}_R`]} />
                      <div className='pointer__circle'></div>
                    </li>
                    <li className={index === 3 ? 'tab__image current' : 'tab__image'} onClick={() => setIndex(3)}>
                      <img width={62} src={ImageHeroSkill[`${hero.name}_LEFT`]} />
                      <div className='pointer__circle'></div>
                    </li>
                    <li className={index === 4 ? 'tab__image current' : 'tab__image'} onClick={() => setIndex(4)}>
                      <img width={62} src={ImageHeroSkill[`${hero.name}_RIGHT`]} />
                      <div className='pointer__circle'></div>
                    </li>
                  </ul>

                  <div className={index === 0 ? 'tab__content current' : 'tab__content'}>
                    <h3 className='title'>{hero.TITLE_Q}</h3>
                    <span className='description'>{hero.DETAIL_Q_SIMPLE}</span>
                  </div>
                  <div className={index === 1 ? 'tab__content current' : 'tab__content'}>
                    <h3 className='title'>{hero.TITLE_E}</h3>
                    <span className='description'>{hero.DETAIL_E_SIMPLE}</span>
                  </div>
                  <div className={index === 2 ? 'tab__content current' : 'tab__content'}>
                    <h3 className='title'>{hero.TITLE_R}</h3>
                    <span className='description'>{hero.DETAIL_R_SIMPLE}</span>
                  </div>
                  <div className={index === 3 ? 'tab__content current' : 'tab__content'}>
                    <h3 className='title'>{hero.TITLE_LEFT}</h3>
                    <span className='description'>{hero.DETAIL_LEFT_SIMPLE}</span>
                  </div>
                  <div className={index === 4 ? 'tab__content current' : 'tab__content'}>
                    <h3 className='title'>{hero.TITLE_RIGHT}</h3>
                    <span className='description'>{hero.DETAIL_RIGHT_SIMPLE}</span>
                  </div>
                </div>
                <div className='skillPlayer'>skillPlayer</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
