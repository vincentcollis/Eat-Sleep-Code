import React from 'react';
import type { LeaderBoardRow } from '../leaderBoardTypes'
// import githubIcon from './githubIcon'

interface LeaderBoardRowsProps {
    row: LeaderBoardRow;
}

const LeaderBoardRows: React.FC<LeaderBoardRowsProps> = ({ row }) => {
    return (
        <div className="leaderboard-row">
            <div className="leaderboard-row-name">
                {row.name}
                <a href={row.githubUrl} target="_blank" rel="noreferrer">GitHub{/*githubIcon*/}</a>
            </div>
            {/* <div className="leaderboard-row-githubUrl">
                <a href={row.githubUrl} target="_blank">{githubIcon}</a>
            </div> */}
            <div className="leaderboard-row-problemsCopmleted">
                {row.problemsCompleted}
            </div>

        </div>
    )
}

export default LeaderBoardRows;


/*
//if wanted, can include a movement along the leaderboard but would have to include it in database
<div className="leaderboard-row-movement">
    {row.movement > 0 ? `▲ ${row.movement}` : row.movement < 0 ? `▼ ${Math.abs(row.movement)}` : '-'}
</div>
*/