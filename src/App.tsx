import React, { useCallback, useEffect, useState } from 'react';
import { BusTimetable } from './BusTimetable';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SchoolIcon from '@material-ui/icons/School';
import TrainIcon from '@material-ui/icons/Train';
import { Typography } from '@material-ui/core';

const App: React.FC = () => {
  const [userPosition, setUserPosition] = useState<GeolocationPosition>();

  const initializeUserPosition = useCallback(() => {
    // geolocation
    // 経度、緯度を取得するコードです。
    const success = (position: GeolocationPosition) => {
      console.log(
        '緯度' + position.coords.latitude,
        '経度' + position.coords.longitude
      );
      setUserPosition(position);
    };

    const fail = (error: GeolocationPositionError) => {
      alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
    };

    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  useEffect(initializeUserPosition, [initializeUserPosition]);

  return (
    <div>
      <BusTimetable
        direction={'outward'}
        busStop={{
          start: '千歳駅',
          via1: '南千歳駅',
          via2: '研究実験棟',
          goal: '本部棟',
        }}
        position={userPosition}>
        <div>
          <TrainIcon />
          <ArrowForwardIcon />
          <SchoolIcon />
          <Typography
            component={'span'}
            variant={'body1'}
            style={{
              marginLeft: '1rem',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}>
            行き
          </Typography>
        </div>
      </BusTimetable>
      <BusTimetable
        direction={'homeward'}
        busStop={{
          start: '本部棟',
          via1: '研究実験棟',
          via2: '南千歳駅',
          goal: '千歳駅',
        }}
        position={userPosition}>
        <div>
          <SchoolIcon /> <ArrowForwardIcon /> <TrainIcon />{' '}
          <Typography
            component={'span'}
            variant={'body1'}
            style={{
              marginLeft: '1rem',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}>
            帰り
          </Typography>
        </div>
      </BusTimetable>
    </div>
  );
};

export default App;
