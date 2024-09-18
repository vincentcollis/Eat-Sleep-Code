import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LeaderBoardRow } from './leaderBoardTypes';

export interface LeaderBoardData {
    daily: LeaderBoardRow[];
    weekly: LeaderBoardRow[];
    allTime: LeaderBoardRow[];
}
export const leaderBoardApi = createApi({
    reducerPath: "leaderBoardApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: (builder) => ({
        getLeaderBoardData: builder.query<LeaderBoardData, void>({
            query: () => "/leaderboard/data"
        }),
    })
});
export const { useGetLeaderBoardDataQuery } = leaderBoardApi;