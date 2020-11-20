import { Playlist, Song } from './generated/graphql';

const songs = [
  {
    id: 'some-id-1',
    title: 'Hello',
    playlistId: 'other-id-1',
  },
  {
    id: 'some-id-2',
    title: 'All I Want For Christmas Is You',
    playlistId: 'other-id-1',
  },
  {
    id: 'some-id-3',
    title: 'Baby',
    playlistId: 'other-id-2',
  },
  {
    id: 'some-id-4',
    title: 'Nights',
  },
];

const playlists = [
  {
    id: 'other-id-1',
    title: 'Party Music',
    songs: ['some-id-1', 'some-id-2'],
  },
  {
    id: 'other-id-2',
    title: 'Romantic Songs',
    songs: ['some-id-3'],
  },
  {
    id: 'other-id-3',
    title: 'New Music',
    songs: [],
  },
];

export default {
  songs: {
    get(id: string): Song | undefined {
      return songs.find(song => song.id === id);
    },
    getByTitle(title: string): Song | undefined {
      return songs.find(song => song.title === title);
    },
    all(): Song[] {
      return songs;
    },
    add(title: string): Song {
      songs.push({
        id: `some-id-${songs.length  + 1}`,
        title,
        playlistId: 'other-id-3',
      });
      const newSong = songs[songs.length - 1];
      playlists.find(p => p.id === 'other-id-3')?.songs.push(newSong.id);
      return newSong;
    },
  },
  playlists: {
    get(id: string): Playlist | undefined {
      return (playlists.find(playlist => playlist.id === id) as unknown) as Playlist;
    },
    getWhere(key: keyof Omit<Playlist, '__typename'>, values: Readonly<any[]>): Playlist[] {
      return (playlists.filter(playlist =>
        values.includes(playlist[key]),
      ) as unknown) as Playlist[];
    },
  },
};
