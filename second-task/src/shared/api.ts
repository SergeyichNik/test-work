import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ServiceType {
  id: string
  name: string
  price: number
  content: string
}

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7070/api' }),
  endpoints: (builder) => ({
    getServices: builder.query<Array<Omit<ServiceType, 'content'>>, void>({
      query: () => '/services'
    }),
    getServicesById: builder.query<ServiceType, string>({
      query: (id) => `/services/${id}`
    })
  })
});

export const { useGetServicesByIdQuery, useGetServicesQuery } = servicesApi;
