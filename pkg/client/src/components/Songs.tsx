import React from 'react';
import { gql } from '@apollo/client';
import { useGetAllSongsQuery } from '../generated/graphql-operations';
import Song, {SongView} from "./Song";

export const GET_ALL_SONGS = gql`
  query GetAllSongs {
    songs {
     ...SongView 
    }
  }
  ${SongView}
`;

const Songs: React.FC = () => {
  const { data, loading, error, refetch } = useGetAllSongsQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error Occurred!</div>;

  return (
    <div>
      {data?.songs.map(song => (
       <Song key={song.id} {...song} />
      ))}
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
};

export default Songs;
