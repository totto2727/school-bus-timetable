import React from 'react';
import {BusTimetable} from "./BusTimetable";

function App() {
    return (
        <div className="App">
            <body>
                <BusTimetable direction={"outward"} title={"駅->学校"}/>
                <BusTimetable direction={"homeward"} title={"学校->駅"}/>
            </body>
        </div>
    );
}

export default App;
