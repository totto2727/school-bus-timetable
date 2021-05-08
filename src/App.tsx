import React, {useCallback, useEffect, useState} from 'react';
import {BusTimetable} from "./BusTimetable";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SchoolIcon from '@material-ui/icons/School';
import TrainIcon from '@material-ui/icons/Train';

function App() {
    const [position,setPosition]=useState<GeolocationPosition>()
    
    const initializeLocation=useCallback(()=>{
        // geolocation
        // 経度、緯度を取得するコードです。
        const success=(pos: GeolocationPosition)=> {
            console.log('緯度' + pos.coords.latitude, '経度' + pos.coords.longitude);
            setPosition(pos)
        }

        const fail=(error: GeolocationPositionError)=> {
            alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
        }
        
        navigator.geolocation.getCurrentPosition(success, fail);
    },[]);
    
    useEffect(initializeLocation,[initializeLocation]);
    
    return (
        <div>
            <body>
            <BusTimetable
                direction={"outward"}
                busStop={{
                    start1: "千歳駅",
                    start2: "南千歳駅",
                    start3: "研究実験棟",
                    goal: "本部棟"
                }}
                position={position}
            >
                <div><TrainIcon/>{' '}<ArrowForwardIcon/>{' '}<SchoolIcon/>{' '}(行き)</div>
            </BusTimetable>
            <BusTimetable
                direction={"homeward"}
                busStop={{
                    start1: "本部棟",
                    start2: "研究実験棟",
                    start3: "南千歳駅",
                    goal: "千歳駅"
                }}
                position={position}
            >
                <div><SchoolIcon/>{' '}<ArrowForwardIcon/>{' '}<TrainIcon/>{' '}(帰り)</div>
            </BusTimetable>
            </body>
        </div>
    );
}

export default App;
