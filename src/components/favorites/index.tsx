import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import IsLoading from '../is_loading';
import MusicCard from '../music_card';
import { SongType } from '../../types';

  type FavoriteSongsProps = {
    favoriteSongs: SongType[]
    isLoading: boolean
  };

function Favorites() {
  const [data, setData] = useState<FavoriteSongsProps>({
    favoriteSongs: [],
    isLoading: false,
  });
  const { favoriteSongs, isLoading } = data;
  useEffect(() => {
    const fetchFavorites = async () => {
      setData((prevData) => ({ ...prevData, isLoading: true }));
      const favorites = await getFavoriteSongs();
      setData((prevData) => ({
        ...prevData,
        favoriteSongs: favorites,
      }));
      setData((prevData) => ({ ...prevData, isLoading: false }));
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavoriteSongs();
      setData((prevData) => ({
        ...prevData,
        favoriteSongs: favorites,
      }));
    };
    fetchFavorites();
  }, [favoriteSongs]);

  if (isLoading) return (<IsLoading />);

  return (

    <div
      className="flex flex-col dark:bg-gray-900 text-white items-center justify-center"
      style={ { minHeight: 'calc(100vh - 57px)' } }

    >

      { favoriteSongs.length === 0
        ? (
          <p
            className="text-4xl"
          >
            Não há músicas favoritas

          </p>
        )
        : (
          <div
            className="flex flex-col items-end overflow-y-auto p-9"
            style={ { height: '70vh' } }

          >
            {
        favoriteSongs && (favoriteSongs.map((favoriteSong) => (

          <MusicCard
            key={ favoriteSong.trackId }
            trackName={ favoriteSong.trackName }
            previewUrl={ favoriteSong.previewUrl }
            trackId={ favoriteSong.trackId }
            favoriteSongs={ favoriteSongs }
          />
        )))
        }
          </div>)}
    </div>

  );
}

export default Favorites;
