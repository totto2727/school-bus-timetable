import React from 'react';
import {BusTimetable} from "./BusTimetable";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SchoolIcon from '@material-ui/icons/School';
import TrainIcon from '@material-ui/icons/Train';

function App() {
    return (
        <div>
            <body>
                <BusTimetable
                    direction={"outward"}
                    busStop={{
                        start1:"千歳駅",
                        start2:"南千歳駅",
                        start3:"研究実験棟",
                        goal:"本部棟"
                    }}>
                    <div><TrainIcon />{' '}<ArrowForwardIcon />{' '}<SchoolIcon />{' '}(行き)</div>
                    </BusTimetable>
                <BusTimetable
                    direction={"homeward"}
                    busStop={{
                        start1:"本部棟",
                        start2:"研究実験棟",
                        start3:"南千歳駅",
                        goal:"千歳駅"
                    }}
                >
                    <div><SchoolIcon />{' '}<ArrowForwardIcon />{' '}<TrainIcon />{' '}(帰り)</div>
                </BusTimetable>
            </body>
        </div>
    );
}

export default App;
