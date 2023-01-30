import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ImageHero from 'components/image/Hero';

type Tier = '멍꿀' | '좋음' | '무난' | '구림' | '트롤';
const Tiers = ['멍꿀', '좋음', '무난', '구림', '트롤'] as const; // keeps the type as narrow as possible

type TierHero = {
  [key in Tier]: string[];
};
const TierHeroSample: TierHero = {
  멍꿀: ['Gadget', 'The Fey', 'Narbash', 'Revenant', 'Kallari', 'Steel'],
  좋음: ['Muriel', 'Murdock', 'Sevarog', 'Belica', 'Kwang'],
  무난: ['Howitzer', 'Khaimera', 'Zena', 'Rampage', 'Gideon', 'Feng Mao', 'Twinblast', 'Sparrow', 'Countess'],
  구림: ['Serath', 'Phase', 'Shinbi', 'Dekker', 'Aurora'],
  트롤: ['Wraith', 'Wukong'],
};

export default function TierHeroes() {
  return (
    <Grid container justifyContent={'center'}>
      <h1 style={{ width: '1280px' }}>곰표 티어 리스트</h1>
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
