import React, { useCallback, useEffect, useState } from 'react';
import { BusTimetable } from './BusTimetable';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SchoolIcon from '@material-ui/icons/School';
import TrainIcon from '@material-ui/icons/Train';

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
          start1: '千歳駅',
          start2: '南千歳駅',
          start3: '研究実験棟',
          goal: '本部棟',
        }}
        position={userPosition}>
        <div>
          <TrainIcon /> <ArrowForwardIcon /> <SchoolIcon /> (行き)
        </div>
      </BusTimetable>
      <BusTimetable
        direction={'homeward'}
        busStop={{
          start1: '本部棟',
          start2: '研究実験棟',
          start3: '南千歳駅',
          goal: '千歳駅',
        }}
        position={userPosition}>
        <div>
          <SchoolIcon /> <ArrowForwardIcon /> <TrainIcon /> (帰り)
        </div>
      </BusTimetable>
    </div>
  );
};

export default App;
