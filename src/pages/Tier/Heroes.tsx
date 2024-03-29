import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ImageHero from 'components/image/Hero';
import bearFoot from 'assets/icon/bear_foot.png';

type Tier = '멍꿀' | '좋음' | '무난' | '구림' | '트롤';
const Tiers = ['멍꿀', '좋음', '무난', '구림', '트롤'] as const; // keeps the type as narrow as possible

type TierHero = {
  [key in Tier]: string[];
};
const TierHeroSample: TierHero = {
  멍꿀: ['Gideon', 'Gadget', 'Grux', 'Countess', 'Dekker', 'Sparrow'],
  좋음: ['Kwang', 'Howitzer', 'Narbash', 'Muriel', 'Murdock', 'Sevarog', 'Aurora', 'Zena', 'Crunch'],
  무난: ['Belica', 'Rampage', 'Steel', 'Kallari', 'Khaimera', 'Feng Mao', 'Twinblast', 'Shinbi'],
  구림: ['The Fey', 'Serath', 'Phase'],
  트롤: ['Revenant', 'Wraith', 'Wukong', 'Iggy & Scorch'],
};

export default function TierHeroes() {
  return (
    <Grid container justifyContent={'center'}>
      <Grid container xs={12}>
        <Grid container xs='auto' alignContent='center'>
          <img src={bearFoot} width={50} height={50} loading='lazy' alt='bearFoot' />
        </Grid>
        <Grid xs={8}>
          <h1 style={{ width: '1280px' }}>곰표 티어 리스트</h1>
        </Grid>
      </Grid>
      <table style={{ width: '1280px', border: '1px solid #444444', borderCollapse: 'collapse' }}>
        {Tiers.map(tier => {
          const heroNameList = TierHeroSample[tier];
          return (
            <tr key={tier}>
              <td
                style={{
                  width: '100px',
                  paddingLeft: '18px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  border: '1px solid #444444',
                }}
              >
                {tier}
              </td>
              <td style={{ border: '1px solid #444444' }}>
                {heroNameList ? (
                  heroNameList.map(heroName => {
                    return (
                      <div key={heroName} style={{ paddingRight: '10px', display: 'inline-block' }}>
                        <ImageHero heroName={heroName} big />
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </td>
            </tr>
          );
        })}
      </table>
    </Grid>
  );
}
