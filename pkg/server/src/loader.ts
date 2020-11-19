import DataLoader, { BatchLoadFn } from 'dataloader';
import { Playlist } from './generated/graphql';
import db from './fakeDb';

export type Loader = {
  playlists: DataLoader<string, Playlist>;
};

export default function init(): Loader {
  const getPlaylists: BatchLoadFn<string, Playlist> = async ids => db.playlists.getWhere('id', ids);

  return {
    playlists: new DataLoader(getPlaylists),
  };
}
