import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Row } from './boardTypes';

export const boardApi = createApi({
    reducerPath: "boardApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: builder => ({
        getBoardData: builder.query<Row[], void>({
            query: () => "/board/data"
        }),
    })
});

export const { useGetBoardDataQuery } = boardApi;
