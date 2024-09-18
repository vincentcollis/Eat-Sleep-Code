import React, { useState, ChangeEvent } from 'react';
import { useGetLeaderBoardDataQuery } from './LeaderBoardContainerAppSlice';
import LeaderBoardRows from './components/LeaderBoardRows';
import type { LeaderBoardRow } from './leaderBoardTypes';
import { Pagination } from '@mui/material';

const vowels = ['a', 'e', 'i', 'o', 'u'];
const mockDaily = [];
for(let i = 0; i < 5; i++) {
    let person: LeaderBoardRow = {
        id: i,
        name: `T${vowels[Math.floor(Math.random()*vowels.length)]}m C${vowels[Math.floor(Math.random()*vowels.length)].repeat(2)}k`,
        problemsCompleted: 100-i
    }
    if(Math.random() < 0.5) {
        person.githubUrl = 'https://github.com'
    }
    mockDaily.push(person);
}
const mockWeekly = [];
for(let i = 0; i < 15; i++) {
    let person: LeaderBoardRow = {
        id: i,
        name: `T${vowels[Math.floor(Math.random()*vowels.length)]}m C${vowels[Math.floor(Math.random()*vowels.length)].repeat(2)}k`,
        problemsCompleted: 100-i
    }
    if(Math.random() < 0.5) {
        person.githubUrl = 'https://github.com'
    }
    mockWeekly.push(person);
}
const mockAllTime = [];
for(let i = 0; i < 50; i++) {
    let person: LeaderBoardRow = {
        id: i,
        name: `T${vowels[Math.floor(Math.random()*vowels.length)]}m C${vowels[Math.floor(Math.random()*vowels.length)].repeat(2)}k`,
        problemsCompleted: 100-i
    }
    if(Math.random() < 0.5) {
        person.githubUrl = 'https://github.com'
    }
    mockAllTime.push(person);
}

const data = {
    dailyLeaderboard: mockDaily,
    weeklyLeaderboard: mockWeekly,
    allTimeLeaderboard: mockAllTime,
}



const pageSize = 5; 


const LeaderBoardContainer: React.FC = () => {
    //daily, weekly, allTime
    const [timeFrame, setTimeFrame] = useState<string>('allTime')
    //pagination state
    const [pagination, setPagination] = useState<number>({
        count: 0,
        from: 0,
        to: pageSize
    });

    //could write as data: variableName to declare variable
    // const { data, error, isLoading  } = useGetLeaderBoardDataQuery();

    const handleTimeFrameChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTimeFrame(e.target.value);
        setPagination(1);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPagination(page);
    }

    const getLeaderBoardData = (): LeaderBoardRow[] => {
        if(!data) return [];

        if(timeFrame === 'daily') {
            return data.dailyLeaderboard;
        } else if (timeFrame === 'weekly') {
            return data.weeklyLeaderboard;
        } else {
            return data.allTimeLeaderboard;
        }
    }

    const leaderBoardData = getLeaderBoardData();

    const lastItemIndex = pagination * pageSize;
    const firstItemIndex = lastItemIndex - pageSize;
    const pageItems = leaderBoardData.slice(firstItemIndex, lastItemIndex); 


    // if(isLoading) {
    //     return <div> Loading... </div>
    // }

    // if(error) {
    //     return <div> Error loading Leaderboard</div>
    // }

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
            {/* Header */}
            <div className="bg-gray-100 py-2 px-4 flex justify-between items-center">
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800">Top Users</h2>
                {/* Select */}
                <div className="flex items-center">
                    <label htmlFor="time-frame" className="mr-2 hidden">Sort by:</label>
                    <select
                        id="time-frame"
                        value={timeFrame}
                        onChange={handleTimeFrameChange}
                        className="border rounded p-1 min-w-[120px]"
                    >
                        <option value="daily">Day</option>
                        <option value="weekly">Week</option>
                        <option value="allTime">All Time</option>
                    </select>
                </div>
            </div>

            {/* Leaderboard List */}
            <ul className="divide-y divide-gray-200">
                {leaderBoardData.length > 0 ? (
                    pageItems.map((row: LeaderBoardRow, index: number) => (
                        <LeaderBoardRows key={row.id} row={row} rank={firstItemIndex + index + 1} />
                    ))
                ) : (
                    <li className="py-4 px-6">No data available</li>
                )}
            </ul>

            <div className="flex justify-center mt-4">
                <Pagination 
                    count={Math.ceil(leaderBoardData.length / pageSize)}
                    page={pagination}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default LeaderBoardContainer;

/*
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
*/