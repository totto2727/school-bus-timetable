import React from 'react';
import {BusTimetable} from "./BusTimetable";

function App() {
    return (
        <div>
            <body>
                <BusTimetable
                    direction={"outward"}
                    title={"駅->学校"}
                    busStop={{
                        start1:"千歳駅",
                        start2:"南千歳駅",
                        start3:"研究実験棟",
                        goal:"本部棟"
                    }}/>
                <BusTimetable
                    direction={"homeward"}
                    title={"学校->駅"}
                    busStop={{
                        start1:"本部棟",
                        start2:"研究実験棟",
                        start3:"南千歳駅",
                        goal:"千歳駅"
                    }}
                />
            </body>
        </div>
    );
}

export default App;
