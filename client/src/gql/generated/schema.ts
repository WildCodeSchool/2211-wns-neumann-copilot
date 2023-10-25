import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CarPool = {
  __typename?: 'CarPool';
  arrivalCity: City;
  departureCity: City;
  departureDateTime: Scalars['DateTime'];
  driverId: Scalars['Float'];
  id: Scalars['Float'];
  passengerId?: Maybe<Scalars['Float']>;
  passengerNumber: Scalars['Float'];
};

export type CarPoolerInput = {
  arrivalCityname: Scalars['String'];
  departureCityname: Scalars['String'];
  departureDateTime: Scalars['DateTime'];
  driverId: Scalars['Float'];
  passengerId?: InputMaybe<Scalars['Float']>;
  passengerNumber: Scalars['Float'];
};

export type City = {
  __typename?: 'City';
  cityName: Scalars['String'];
  id: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  zipCode: Scalars['Float'];
};

export type CityInput = {
  cityName: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  zipCode: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCarPool: CarPool;
  createCity: City;
  createUser: User;
  deleteCarPool: Scalars['Boolean'];
  login: Scalars['String'];
  logout: Scalars['Boolean'];
  sendNotification: Scalars['Boolean'];
  updateProfile: User;
  updateUser: User;
};


export type MutationCreateCarPoolArgs = {
  data: CarPoolerInput;
};


export type MutationCreateCityArgs = {
  data: CityInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteCarPoolArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  data: UserInput;
};


export type MutationSendNotificationArgs = {
  data: NotificationInput;
  userId: Scalars['Int'];
};


export type MutationUpdateProfileArgs = {
  data: UserUpdateNativeInput;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
};

export type NotificationInput = {
  JSONPayload?: InputMaybe<Scalars['String']>;
  body: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCarPool: CarPool;
  getCarPoolByCities: Array<CarPool>;
  getCarPools: Array<CarPool>;
  getCities: Array<City>;
  getCity: City;
  getUsers: Array<User>;
  profile: User;
};


export type QueryGetCarPoolArgs = {
  id: Scalars['Int'];
};


export type QueryGetCarPoolByCitiesArgs = {
  data: GetCarPoolByCitiesInput;
};


export type QueryGetCityArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  age?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  expoNotificationsToken: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  lastName?: Maybe<Scalars['String']>;
  profileDescription?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  role: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserUpdateInput = {
  age?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  profileDescription?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
};

export type UserUpdateNativeInput = {
  expoNotificationsToken: Scalars['String'];
};

export type GetCarPoolByCitiesInput = {
  arrivalCity: Scalars['String'];
  departureCity: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: number, email: string }> };

export type CreateCarPoolMutationVariables = Exact<{
  data: CarPoolerInput;
}>;


export type CreateCarPoolMutation = { __typename?: 'Mutation', createCarPool: { __typename?: 'CarPool', id: number, departureDateTime: any, passengerNumber: number, passengerId?: number | null, driverId: number, departureCity: { __typename?: 'City', cityName: string }, arrivalCity: { __typename?: 'City', cityName: string } } };

export type GetCarPoolQueryVariables = Exact<{
  getCarPoolId: Scalars['Int'];
}>;


export type GetCarPoolQuery = { __typename?: 'Query', getCarPool: { __typename?: 'CarPool', departureDateTime: any, passengerNumber: number, passengerId?: number | null, driverId: number, departureCity: { __typename?: 'City', cityName: string }, arrivalCity: { __typename?: 'City', cityName: string } } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', getCarPools: Array<{ __typename?: 'CarPool', id: number, departureDateTime: any, passengerNumber: number, driverId: number, departureCity: { __typename?: 'City', cityName: string }, arrivalCity: { __typename?: 'City', cityName: string } }> };

export type DeleteCarPoolMutationVariables = Exact<{
  deleteCarPoolId: Scalars['Int'];
}>;


export type DeleteCarPoolMutation = { __typename?: 'Mutation', deleteCarPool: boolean };

export type GetCarPoolByCitiesQueryVariables = Exact<{
  data: GetCarPoolByCitiesInput;
}>;


export type GetCarPoolByCitiesQuery = { __typename?: 'Query', getCarPoolByCities: Array<{ __typename?: 'CarPool', departureDateTime: any, passengerNumber: number, passengerId?: number | null, driverId: number, id: number, departureCity: { __typename?: 'City', cityName: string }, arrivalCity: { __typename?: 'City', cityName: string } }> };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, email: string, profilePicture?: string | null, profileDescription?: string | null, firstName?: string | null, lastName?: string | null, role: string, age?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', age?: string | null, email: string, firstName?: string | null, profileDescription?: string | null, lastName?: string | null, profilePicture?: string | null } };

export type LoginMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };


export const CreateUserDocument = gql`
    mutation createUser($data: UserInput!) {
  createUser(data: $data) {
    id
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    email
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const CreateCarPoolDocument = gql`
    mutation CreateCarPool($data: CarPoolerInput!) {
  createCarPool(data: $data) {
    id
    departureDateTime
    passengerNumber
    passengerId
    driverId
    departureCity {
      cityName
    }
    arrivalCity {
      cityName
    }
  }
}
    `;
export type CreateCarPoolMutationFn = Apollo.MutationFunction<CreateCarPoolMutation, CreateCarPoolMutationVariables>;

/**
 * __useCreateCarPoolMutation__
 *
 * To run a mutation, you first call `useCreateCarPoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCarPoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCarPoolMutation, { data, loading, error }] = useCreateCarPoolMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCarPoolMutation(baseOptions?: Apollo.MutationHookOptions<CreateCarPoolMutation, CreateCarPoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCarPoolMutation, CreateCarPoolMutationVariables>(CreateCarPoolDocument, options);
      }
export type CreateCarPoolMutationHookResult = ReturnType<typeof useCreateCarPoolMutation>;
export type CreateCarPoolMutationResult = Apollo.MutationResult<CreateCarPoolMutation>;
export type CreateCarPoolMutationOptions = Apollo.BaseMutationOptions<CreateCarPoolMutation, CreateCarPoolMutationVariables>;
export const GetCarPoolDocument = gql`
    query GetCarPool($getCarPoolId: Int!) {
  getCarPool(id: $getCarPoolId) {
    departureCity {
      cityName
    }
    arrivalCity {
      cityName
    }
    departureDateTime
    passengerNumber
    passengerId
    driverId
  }
}
    `;

/**
 * __useGetCarPoolQuery__
 *
 * To run a query within a React component, call `useGetCarPoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarPoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarPoolQuery({
 *   variables: {
 *      getCarPoolId: // value for 'getCarPoolId'
 *   },
 * });
 */
export function useGetCarPoolQuery(baseOptions: Apollo.QueryHookOptions<GetCarPoolQuery, GetCarPoolQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarPoolQuery, GetCarPoolQueryVariables>(GetCarPoolDocument, options);
      }
export function useGetCarPoolLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarPoolQuery, GetCarPoolQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarPoolQuery, GetCarPoolQueryVariables>(GetCarPoolDocument, options);
        }
export type GetCarPoolQueryHookResult = ReturnType<typeof useGetCarPoolQuery>;
export type GetCarPoolLazyQueryHookResult = ReturnType<typeof useGetCarPoolLazyQuery>;
export type GetCarPoolQueryResult = Apollo.QueryResult<GetCarPoolQuery, GetCarPoolQueryVariables>;
export const QueryDocument = gql`
    query Query {
  getCarPools {
    id
    departureCity {
      cityName
    }
    arrivalCity {
      cityName
    }
    departureDateTime
    passengerNumber
    driverId
  }
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;
export const DeleteCarPoolDocument = gql`
    mutation DeleteCarPool($deleteCarPoolId: Int!) {
  deleteCarPool(id: $deleteCarPoolId)
}
    `;
export type DeleteCarPoolMutationFn = Apollo.MutationFunction<DeleteCarPoolMutation, DeleteCarPoolMutationVariables>;

/**
 * __useDeleteCarPoolMutation__
 *
 * To run a mutation, you first call `useDeleteCarPoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCarPoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCarPoolMutation, { data, loading, error }] = useDeleteCarPoolMutation({
 *   variables: {
 *      deleteCarPoolId: // value for 'deleteCarPoolId'
 *   },
 * });
 */
export function useDeleteCarPoolMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCarPoolMutation, DeleteCarPoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCarPoolMutation, DeleteCarPoolMutationVariables>(DeleteCarPoolDocument, options);
      }
export type DeleteCarPoolMutationHookResult = ReturnType<typeof useDeleteCarPoolMutation>;
export type DeleteCarPoolMutationResult = Apollo.MutationResult<DeleteCarPoolMutation>;
export type DeleteCarPoolMutationOptions = Apollo.BaseMutationOptions<DeleteCarPoolMutation, DeleteCarPoolMutationVariables>;
export const GetCarPoolByCitiesDocument = gql`
    query GetCarPoolByCities($data: getCarPoolByCitiesInput!) {
  getCarPoolByCities(data: $data) {
    departureCity {
      cityName
    }
    arrivalCity {
      cityName
    }
    departureDateTime
    passengerNumber
    passengerId
    driverId
    id
  }
}
    `;

/**
 * __useGetCarPoolByCitiesQuery__
 *
 * To run a query within a React component, call `useGetCarPoolByCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarPoolByCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarPoolByCitiesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCarPoolByCitiesQuery(baseOptions: Apollo.QueryHookOptions<GetCarPoolByCitiesQuery, GetCarPoolByCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarPoolByCitiesQuery, GetCarPoolByCitiesQueryVariables>(GetCarPoolByCitiesDocument, options);
      }
export function useGetCarPoolByCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarPoolByCitiesQuery, GetCarPoolByCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarPoolByCitiesQuery, GetCarPoolByCitiesQueryVariables>(GetCarPoolByCitiesDocument, options);
        }
export type GetCarPoolByCitiesQueryHookResult = ReturnType<typeof useGetCarPoolByCitiesQuery>;
export type GetCarPoolByCitiesLazyQueryHookResult = ReturnType<typeof useGetCarPoolByCitiesLazyQuery>;
export type GetCarPoolByCitiesQueryResult = Apollo.QueryResult<GetCarPoolByCitiesQuery, GetCarPoolByCitiesQueryVariables>;
export const GetProfileDocument = gql`
    query getProfile {
  profile {
    id
    email
    profilePicture
    profileDescription
    firstName
    lastName
    role
    age
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UserUpdateInput!) {
  updateUser(data: $data) {
    age
    email
    firstName
    profileDescription
    lastName
    profilePicture
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: UserInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;