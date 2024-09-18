import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Row, AddLeetcodeProblem, LeetcodeProblem } from './boardTypes';
import getAuthToken from '../../utils/serverComms';

export const boardApi = createApi({
    reducerPath: "boardApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:8080", 
        prepareHeaders: async (headers) => {
            const token = await getAuthToken();
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: builder => ({
        getBoardData: builder.query<Row, void>({
            query: () => "/api/user/get_UserBoardProblems"
        }),
        getAllProblems: builder.query<LeetcodeProblem[], void>({
            query: () => "/api/database/all"
        }),
        addBoardRow: builder.mutation<void, Partial<AddLeetcodeProblem>>({
            query: (problem) => ({
                url: "/api/user/add_ProblemToBoard",
                method: 'POST',
                body: problem,
            })
        }),
        changeCompletedStatus: builder.mutation<void, Partial<AddLeetcodeProblem>>({
            query: (problem) => ({
                url: "/api/user/update_SetProblemToComplete",
                method: 'POST',
                body: problem,
            })
        }),
    })
});

export const { useGetBoardDataQuery, useGetAllProblemsQuery, useAddBoardRowMutation, useChangeCompletedStatusMutation } = boardApi;
