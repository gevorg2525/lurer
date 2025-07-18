"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import authHeader from "@/app/api/authHeader";
import requestQuery from "@/app/api/requestQuery";

interface IHeader {
    "Content-Type": string;
    Authorization?: string;
}

export const norKhosqApi = createApi({
    reducerPath: "norKhosqApi",
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: `https://newsbook.am/api/`,
        prepareHeaders: (headers) => {
            const Header: IHeader = authHeader();
            headers.set("Content-Type", Header["Content-Type"]);
            headers.set("Authorization", Header["Authorization"] || "token");
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getNews: builder.query<any, Object>({
            query: (queryParams) => {
                const queryStr = `news${requestQuery(queryParams)}&sort=${JSON.stringify([
                    "id",
                    "DESC",
                ])}`;
                return { url: queryStr };
            },
        }),
        getNewsById: builder.query<any, string>({
            query: (id) => {
                const queryStr = `news/${id}?between=${JSON.stringify({
                    published_at: {
                        to: new Date(),
                    },
                })}`;
                return { url: queryStr };
            },
        }),
        getNewsByKey: builder.query<any, string>({
            query: (words) => {
                const queryStr = `news/key_words?key_words=${words}`;
                return { url: queryStr };
            },
        }),
        getCategories: builder.query<any, Object>({
            query: (queryParams) => {
                const queryStr = `categories${requestQuery(queryParams)}}`;
                return { url: queryStr };
            },
        }),

        getCategoryById: builder.query<any, string | number>({
            query: (id) => {
                const queryStr = `categories/${id}`;
                return { url: queryStr };
            },
        }),
    }),
});

export const {
    useGetNewsQuery,
    useGetNewsByIdQuery,
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetNewsByKeyQuery,
} = norKhosqApi;
