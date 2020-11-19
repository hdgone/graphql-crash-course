import { gql } from 'apollo-server';

export default gql`
  type Song {
    id: ID!
    title: String!
    playlist: Playlist
  }

  type Playlist {
    id: ID!
    title: String!
    songs: [Song!]!
  }

  input AddSongInput {
    title: String!
  }

  type AddSongSuccess {
    song: Song!
  }

  enum AddSongErrorCode {
    ALREADY_EXISTS
  }

  type AddSongError {
    errorCodes: [AddSongErrorCode!]!
  }

  union AddSongResult = AddSongSuccess | AddSongError

  type Query {
    song(id: ID!): Song
    songs: [Song!]!
  }

  type Mutation {
    addSong(input: AddSongInput!): AddSongResult!
  }
`;
