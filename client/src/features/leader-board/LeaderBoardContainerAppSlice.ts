import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LeaderBoardRow } from './leaderBoardTypes';

export interface LeaderBoardData {
    dailyLeaderboard: LeaderBoardRow[];
    weeklyLeaderboard: LeaderBoardRow[];
    allTimeLeaderboard: LeaderBoardRow[];
}
export const leaderBoardApi = createApi({
    reducerPath: "leaderBoardApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: (builder) => ({
        getLeaderBoardData: builder.query<LeaderBoardData, void>({
            query: () => "/api/leaderBoard"
        }),
    })
});
export const { useGetLeaderBoardDataQuery } = leaderBoardApi;