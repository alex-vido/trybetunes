import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import IsLoading from '../is_loading';
import MusicCard from '../music_card';
import { SongType } from '../../types';

function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritesInitial = async () => {
      const favorites = await getFavoriteSongs();
      setFavoriteSongs(favorites);
      setIsLoading(false);
    };
    fetchFavoritesInitial();
  }, [isLoading]);

  if (isLoading) return (<IsLoading />);

  return (

    <div
      className="flex flex-col dark:bg-gray-900 text-white items-center justify-center"
      style={ { minHeight: 'calc(100vh - 57px)' } }

    >

      { (favoriteSongs.length === 0 && !isLoading)
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
            setIsLoading={ setIsLoading }
          />
        )))
        }
          </div>)}
    </div>

  );
}

export default Favorites;
