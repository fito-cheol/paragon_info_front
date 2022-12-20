import heroList from './DB_Hero.json';

type HERO_DICT = {
  [index: string]: Hero;
};
const heroDict: HERO_DICT = {};
heroList.map(hero => {
  heroDict[hero.name] = hero;
});

export default heroDict;
