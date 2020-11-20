import React from 'react';
import { gql } from '@apollo/client';
import { SongViewFragment } from '../generated/graphql-operations';

export const SongView = gql`
  fragment SongView on Song {
    id
    title
    playlist {
      title
    }
  }
`;

const Song: React.FC<SongViewFragment> = ({ title, playlist }) => (
  <div>
    <p>Song: {title}</p>
    <p>Playlist: {playlist?.title}</p>
  </div>
);

export default Song;
