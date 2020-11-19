import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { AddSongResolver, GetAllSongsResolver, GetSongResolver } from './resolvers';
import initDataloader, { Loader } from './loader';

type Context = {
  loader: Loader;
};

type ResultResolveType = {
  [x: string]: {
    __resolveType: (obj: { errorCodes: string[] | undefined }) => string;
  };
};

const resultResolveTypeResolver = (resolverName: string): ResultResolveType => ({
  [`${resolverName}Result`]: {
    __resolveType: obj => (obj.errorCodes ? `${resolverName}Error` : `${resolverName}Success`),
  },
});

const resolvers = {
  Query: {
    song: GetSongResolver,
    songs: GetAllSongsResolver,
  },
  Mutation: {
    addSong: AddSongResolver,
  },
  Song: {
    playlist(song: { playlistId: string | undefined }, __: Record<string, unknown>, ctx: Context) {
      return song.playlistId && ctx.loader.playlists.load(song.playlistId);
    },
  },
  ...resultResolveTypeResolver('AddSong'),
};

const server = new ApolloServer({
  typeDefs: schema,
  context: (): Context => ({
    loader: initDataloader(),
  }),
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
