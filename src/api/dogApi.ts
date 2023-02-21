import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const DOG_API_KEY = 'ef867ca0-a6f4-4871-9135-907d77e7a21f';

interface Breed {
    id: string;
    name: string;
    image: {
        url: string;
    };
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.thedogapi.com/v1/',
        prepareHeaders(headers) {
            headers.set('x-api-key', DOG_API_KEY);
            return headers;
        },
    }),
    endpoints: builder => ({
        fetchBreed: builder.query<Breed[], number | void>({
            query: (limit = 10) => `/breeds?limit=${limit}`,
        }),
    }),
});

export const {useFetchBreedQuery} = apiSlice;
