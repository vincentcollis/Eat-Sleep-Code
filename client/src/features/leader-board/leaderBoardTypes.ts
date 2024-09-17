export interface LeaderBoardRow {
    daily?: string;
    weekly?: string;
    allTime?: string;
    id: number;
    name: string;
    problemsCompleted: number;
    movement?: number;
    githubUrl?: string;
}