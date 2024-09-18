import React, { useState, ChangeEvent } from 'react';
import { useGetLeaderBoardDataQuery } from './LeaderBoardContainerAppSlice';
import LeaderBoardRows from './components/LeaderBoardRows';
import type { LeaderBoardRow } from './leaderBoardTypes';

// *** Mock Data ***
const data = {
    daily: [
        {
                id: 1,
                name: 'Tam Cook',
                problemsCompleted: 5,
                githubUrl: 'https://github.com',
        }, 
        {
                id: 2,
                name: 'Tem Cook',
                problemsCompleted: 4,
                githubUrl: 'https://github.com',
        }, 
    ],  
    weekly: [
        {
                id: 1,
                name: 'Tam Cook',
                problemsCompleted: 5,
                githubUrl: 'https://github.com',
        }, 
        {
                id: 2,
                name: 'Tem Cook',
                problemsCompleted: 4,
                githubUrl: 'https://github.com',
        }, 
        {
                id: 3,
                name: 'Tim Cook',
                problemsCompleted: 3,
                githubUrl: 'https://github.com',
        }, 
    ],
    allTime: [
        {
                id: 1,
                name: 'Tam Cook',
                problemsCompleted: 5,
                githubUrl: 'https://github.com',
        }, 
        {
                id: 2,
                name: 'Tem Cook',
                problemsCompleted: 4,
                githubUrl: 'https://github.com',
        }, 
        {
                id: 3,
                name: 'Tim Cook',
                problemsCompleted: 3,
                githubUrl: 'https://github.com',
        }, 
        {
                id: 4,
                name: 'Tom Cook',
                problemsCompleted: 2,
                githubUrl: 'https://github.com',
        }, 
        {
                id: 5,
                name: 'Tum Cook',
                problemsCompleted: 1,
                githubUrl: 'https://github.com'
        }, 
    ],
}


const LeaderBoardContainer: React.FC = () => {
    //daily, weekly, allTime
    const [timeFrame, setTimeFrame] = useState<string>('allTime')
    //leaderBoardData
    // const { data, error, isLoading  } = useGetLeaderBoardDataQuery();

    const handleTimeFrameChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTimeFrame(e.target.value);
    }

    const getLeaderBoardData = (): LeaderBoardRow[] => {
        if(timeFrame === 'daily') {
            return data.daily;
        } else if (timeFrame === 'weekly') {
            return data.weekly;
        } else {
            return data.allTime;
        }
    }

    const leaderBoardData = getLeaderBoardData();
    // if(isLoading) {
    //     return <div> Loading... </div>
    // }

    // if(error) {
    //     return <div> Error loading Leaderboard</div>
    // }

    return (
        <div className="leaderboard-container">
            <div className="time-frame-selector">
                <label htmlFor="time-frame">Sort by:</label>
                <select id="time-frame" value={timeFrame} onChange={handleTimeFrameChange}>
                    <option value="daily">Day</option>
                    <option value="weekly">Week</option>
                    <option value="allTime">All Time</option>
                </select>
            </div>

            {leaderBoardData.map((row:LeaderBoardRow) => (
                <LeaderBoardRows key={row.id} row={row} />
            ))}
        </div>
    )
}

export default LeaderBoardContainer;

