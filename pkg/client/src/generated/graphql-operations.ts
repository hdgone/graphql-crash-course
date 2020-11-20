import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Song = {
  __typename?: 'Song';
  id: Scalars['ID'];
  title: Scalars['String'];
  playlist?: Maybe<Playlist>;
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['ID'];
  title: Scalars['String'];
  songs: Array<Song>;
};

export type AddSongInput = {
  title: Scalars['String'];
};

export type AddSongSuccess = {
  __typename?: 'AddSongSuccess';
  song: Song;
};

export enum AddSongErrorCode {
  AlreadyExists = 'ALREADY_EXISTS'
}

export type AddSongError = {
  __typename?: 'AddSongError';
  errorCodes: Array<AddSongErrorCode>;
};

export type AddSongResult = AddSongSuccess | AddSongError;

export type Query = {
  __typename?: 'Query';
  song?: Maybe<Song>;
  songs: Array<Song>;
};


export type QuerySongArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addSong: AddSongResult;
};


export type MutationAddSongArgs = {
  input: AddSongInput;
};

export type AddNewSongMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type AddNewSongMutation = (
  { __typename?: 'Mutation' }
  & { addSong: (
    { __typename?: 'AddSongSuccess' }
    & { song: (
      { __typename?: 'Song' }
      & Pick<Song, 'id' | 'title'>
      & { playlist?: Maybe<(
        { __typename?: 'Playlist' }
        & Pick<Playlist, 'id' | 'title'>
      )> }
    ) }
  ) | (
    { __typename?: 'AddSongError' }
    & Pick<AddSongError, 'errorCodes'>
  ) }
);

export type SongViewFragment = (
  { __typename?: 'Song' }
  & Pick<Song, 'id' | 'title'>
  & { playlist?: Maybe<(
    { __typename?: 'Playlist' }
    & Pick<Playlist, 'title'>
  )> }
);

export type GetAllSongsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSongsQuery = (
  { __typename?: 'Query' }
  & { songs: Array<(
    { __typename?: 'Song' }
    & Pick<Song, 'id' | 'title'>
    & { playlist?: Maybe<(
      { __typename?: 'Playlist' }
      & Pick<Playlist, 'id' | 'title'>
    )> }
  )> }
);

export const SongViewFragmentDoc = gql`
    fragment SongView on Song {
  id
  title
  playlist {
    title
  }
}
    `;
export const AddNewSongDocument = gql`
    mutation AddNewSong($title: String!) {
  addSong(input: {title: $title}) {
    ... on AddSongSuccess {
      song {
        id
        title
        playlist {
          id
          title
        }
      }
    }
    ... on AddSongError {
      errorCodes
    }
  }
}
    `;
export type AddNewSongMutationFn = Apollo.MutationFunction<AddNewSongMutation, AddNewSongMutationVariables>;

/**
 * __useAddNewSongMutation__
 *
 * To run a mutation, you first call `useAddNewSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewSongMutation, { data, loading, error }] = useAddNewSongMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddNewSongMutation(baseOptions?: Apollo.MutationHookOptions<AddNewSongMutation, AddNewSongMutationVariables>) {
        return Apollo.useMutation<AddNewSongMutation, AddNewSongMutationVariables>(AddNewSongDocument, baseOptions);
      }
export type AddNewSongMutationHookResult = ReturnType<typeof useAddNewSongMutation>;
export type AddNewSongMutationResult = Apollo.MutationResult<AddNewSongMutation>;
export type AddNewSongMutationOptions = Apollo.BaseMutationOptions<AddNewSongMutation, AddNewSongMutationVariables>;
export const GetAllSongsDocument = gql`
    query GetAllSongs {
  songs {
    id
    title
    playlist {
      id
      title
    }
  }
}
    `;

/**
 * __useGetAllSongsQuery__
 *
 * To run a query within a React component, call `useGetAllSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSongsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSongsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSongsQuery, GetAllSongsQueryVariables>) {
        return Apollo.useQuery<GetAllSongsQuery, GetAllSongsQueryVariables>(GetAllSongsDocument, baseOptions);
      }
export function useGetAllSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSongsQuery, GetAllSongsQueryVariables>) {
          return Apollo.useLazyQuery<GetAllSongsQuery, GetAllSongsQueryVariables>(GetAllSongsDocument, baseOptions);
        }
export type GetAllSongsQueryHookResult = ReturnType<typeof useGetAllSongsQuery>;
export type GetAllSongsLazyQueryHookResult = ReturnType<typeof useGetAllSongsLazyQuery>;
export type GetAllSongsQueryResult = Apollo.QueryResult<GetAllSongsQuery, GetAllSongsQueryVariables>;