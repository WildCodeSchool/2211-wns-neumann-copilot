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
};

export type CarPool = {
  __typename?: 'CarPool';
  arrivalCity: Scalars['String'];
  departureCity: Scalars['String'];
  departureDate?: Maybe<Scalars['String']>;
  departureTime?: Maybe<Scalars['String']>;
  driverId?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  passengerId?: Maybe<Scalars['String']>;
};

export type CarPoolerInput = {
  arrivalCity: Scalars['String'];
  departureCity: Scalars['String'];
  departureDate: Scalars['String'];
  departureTime: Scalars['String'];
  driverId: Scalars['Float'];
  passengerId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCarPool: CarPool;
  createUser: User;
  deleteCarPool: Scalars['Boolean'];
  login: Scalars['String'];
  logout: Scalars['Boolean'];
  updateCarpool: CarPool;
  updateUser: User;
};


export type MutationCreateCarPoolArgs = {
  data: CarPoolerInput;
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


export type MutationUpdateCarpoolArgs = {
  carPoolId: Scalars['Int'];
  data: CarPoolerInput;
  userId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  getCarPool: CarPool;
  getCarPools: Array<CarPool>;
  getUsers: Array<User>;
  profile: User;
};


export type QueryGetCarPoolArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  age?: Maybe<Scalars['String']>;
  email: Scalars['String'];
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

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: number, email: string }> };

export type MutationMutationVariables = Exact<{
  data: CarPoolerInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', createCarPool: { __typename?: 'CarPool', id: number, departureCity: string, arrivalCity: string, departureDate?: string | null, departureTime?: string | null, passengerId?: string | null, driverId?: number | null } };

export type QueryQueryVariables = Exact<{
  getCarPoolId: Scalars['Int'];
}>;


export type QueryQuery = { __typename?: 'Query', getCarPool: { __typename?: 'CarPool', id: number, departureCity: string, arrivalCity: string, departureDate?: string | null, departureTime?: string | null, passengerId?: string | null, driverId?: number | null } };

export type GetCarPoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarPoolsQuery = { __typename?: 'Query', getCarPools: Array<{ __typename?: 'CarPool', id: number, departureCity: string, arrivalCity: string, departureDate?: string | null, departureTime?: string | null, passengerId?: string | null, driverId?: number | null }> };

export type UpdateCarpoolMutationVariables = Exact<{
  data: CarPoolerInput;
  carPoolId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type UpdateCarpoolMutation = { __typename?: 'Mutation', updateCarpool: { __typename?: 'CarPool', id: number, departureCity: string, arrivalCity: string, departureDate?: string | null, departureTime?: string | null, passengerId?: string | null, driverId?: number | null } };

export type DeleteCarPoolMutationVariables = Exact<{
  deleteCarPoolId: Scalars['Int'];
}>;


export type DeleteCarPoolMutation = { __typename?: 'Mutation', deleteCarPool: boolean };

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
export const MutationDocument = gql`
    mutation Mutation($data: CarPoolerInput!) {
  createCarPool(data: $data) {
    id
    departureCity
    arrivalCity
    departureDate
    departureTime
    passengerId
    driverId
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const QueryDocument = gql`
    query Query($getCarPoolId: Int!) {
  getCarPool(id: $getCarPoolId) {
    id
    departureCity
    arrivalCity
    departureDate
    departureTime
    passengerId
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
 *      getCarPoolId: // value for 'getCarPoolId'
 *   },
 * });
 */
export function useQueryQuery(baseOptions: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
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
export const GetCarPoolsDocument = gql`
    query GetCarPools {
  getCarPools {
    id
    departureCity
    arrivalCity
    departureDate
    departureTime
    passengerId
    driverId
  }
}
    `;

/**
 * __useGetCarPoolsQuery__
 *
 * To run a query within a React component, call `useGetCarPoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarPoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarPoolsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCarPoolsQuery(baseOptions?: Apollo.QueryHookOptions<GetCarPoolsQuery, GetCarPoolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarPoolsQuery, GetCarPoolsQueryVariables>(GetCarPoolsDocument, options);
      }
export function useGetCarPoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarPoolsQuery, GetCarPoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarPoolsQuery, GetCarPoolsQueryVariables>(GetCarPoolsDocument, options);
        }
export type GetCarPoolsQueryHookResult = ReturnType<typeof useGetCarPoolsQuery>;
export type GetCarPoolsLazyQueryHookResult = ReturnType<typeof useGetCarPoolsLazyQuery>;
export type GetCarPoolsQueryResult = Apollo.QueryResult<GetCarPoolsQuery, GetCarPoolsQueryVariables>;
export const UpdateCarpoolDocument = gql`
    mutation UpdateCarpool($data: CarPoolerInput!, $carPoolId: Int!, $userId: Int!) {
  updateCarpool(data: $data, carPoolId: $carPoolId, userId: $userId) {
    id
    departureCity
    arrivalCity
    departureDate
    departureTime
    passengerId
    driverId
  }
}
    `;
export type UpdateCarpoolMutationFn = Apollo.MutationFunction<UpdateCarpoolMutation, UpdateCarpoolMutationVariables>;

/**
 * __useUpdateCarpoolMutation__
 *
 * To run a mutation, you first call `useUpdateCarpoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarpoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarpoolMutation, { data, loading, error }] = useUpdateCarpoolMutation({
 *   variables: {
 *      data: // value for 'data'
 *      carPoolId: // value for 'carPoolId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateCarpoolMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarpoolMutation, UpdateCarpoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCarpoolMutation, UpdateCarpoolMutationVariables>(UpdateCarpoolDocument, options);
      }
export type UpdateCarpoolMutationHookResult = ReturnType<typeof useUpdateCarpoolMutation>;
export type UpdateCarpoolMutationResult = Apollo.MutationResult<UpdateCarpoolMutation>;
export type UpdateCarpoolMutationOptions = Apollo.BaseMutationOptions<UpdateCarpoolMutation, UpdateCarpoolMutationVariables>;
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