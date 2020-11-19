import {
  AddSongErrorCode,
  AddSongResult,
  MutationAddSongArgs,
  QuerySongArgs,
  ResolverFn,
  Song,
} from './generated/graphql';
import db from './fakeDb';

export const GetSongResolver: ResolverFn<
  Song | undefined,
  Record<string, unknown>,
  Record<string, unknown>,
  QuerySongArgs
> = (_, { id }) => {
  return db.songs.get(id);
};

export const GetAllSongsResolver: ResolverFn<
  Song[],
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>
> = () => {
  return db.songs.all();
};

export const AddSongResolver: ResolverFn<
  AddSongResult,
  Record<string, unknown>,
  Record<string, unknown>,
  MutationAddSongArgs
> = (_, { input }) => {
  const songExists = db.songs.getByTitle(input.title);
  if (songExists) {
    return { errorCodes: [AddSongErrorCode.AlreadyExists] };
  }
  const newSong = db.songs.add(input.title);
  return {
    song: newSong,
  };
};
