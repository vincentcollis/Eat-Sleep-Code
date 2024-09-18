import React from 'react';
import type { LeaderBoardRow } from '../leaderBoardTypes'
import githubIcon from '../github-mark.png'

interface LeaderBoardRowsProps {
    row: LeaderBoardRow;
    rank: number;
}

const LeaderBoardRows: React.FC<LeaderBoardRowsProps> = ({ row, rank }) => {
    return (
        <li className="flex items-center py-4 px-6">
            {/* Rank */}
            <span className="text-gray-700 text-lg font-medium mr-4">{rank}.</span>
            {/* Name and GitHub */}
            <div className="flex items-center flex-1">
                <h3 className="text-lg font-medium text-gray-800 mr-2">
                    {row.name}
                </h3>
                    {row.githubUrl && (
                        <a
                            href={row.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:underline ml-2"
                        >
                            <img src={githubIcon} alt="github-icon" width="20" height="20"/>
                        </a>
                    )}
            </div>
            {/* Problems Completed */}
            <div className="text-gray-600">{row.problemsCompleted} completed problems</div>

        </li>
    )
}

export default LeaderBoardRows;


/*
//if wanted, can include a movement along the leaderboard but would have to include it in database
<div className="leaderboard-row-movement">
    {row.movement > 0 ? `▲ ${row.movement}` : row.movement < 0 ? `▼ ${Math.abs(row.movement)}` : '-'}
</div>
*/
