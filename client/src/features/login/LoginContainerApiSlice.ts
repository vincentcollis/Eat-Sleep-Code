import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type OAuthID from './loginTypes';

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:8080" }),
    endpoints: builder => ({
      tryLogin: builder.mutation<void, Partial<OAuthID>>({
            query: (oauth_id) => ({
                url: "/api/user/create_user",
                method: 'POST',
                body: oauth_id,
            })
        }),
    })
});

export const { useTryLoginMutation } = loginApi;
