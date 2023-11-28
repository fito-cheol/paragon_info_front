import heroList from './DB_Hero.json';


type HERO_DICT = {
  [index: string]: [Hero];
};

const heroDictByPosition: HERO_DICT = {};
heroList.map(hero => {
  const position = hero.position;
  if (position in heroDictByPosition){
    heroDictByPosition[hero.position].push(hero);
  }else{
    heroDictByPosition[hero.position] = [hero];
  }
  
});

export default heroDictByPosition;
