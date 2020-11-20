import React, { useCallback, useState } from 'react';
import { gql } from '@apollo/client';
import { Song, useAddNewSongMutation } from '../generated/graphql-operations';
import { GET_ALL_SONGS } from './Songs';

const ADD_NEW_SONG = gql`
  mutation AddNewSong($title: String!) {
    addSong(input: { title: $title }) {
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

const AddSong: React.FC = () => {
  const [title, setTitle] = useState('');
  const [newSong, { data }] = useAddNewSongMutation();

  const addSong = useCallback(async () => {
    if (title) {
      await newSong({
        variables: { title },
        update: (cache, { data: newData }) => {
          if (newData?.addSong.__typename === 'AddSongSuccess') {
            const cacheData = cache.readQuery<{ songs:  Song[]}>({ query: GET_ALL_SONGS });
            cache.modify({
              fields: {
                songs() {
                  return [...(cacheData?.songs || []), (newData as any).addSong.song];
                }
              }
            });
          }
        }
      });
      setTitle("");
    }
  }, [title, setTitle, newSong]);

  return (
    <div>
      <input
        type="text"
        placeholder="Song Title"
        onChange={(v) => setTitle(v.target.value)}
      />
      <button onClick={() => addSong()}>Add</button>
    </div>
  )
};

export default AddSong;
