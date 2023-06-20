import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../music_card';
import { AlbumType, SongType } from '../../types';
import IsLoading from '../is_loading';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

  type AlbumTypeProps = {
    isLoading: boolean
    album: AlbumType
    musics: SongType[]
  };

function Album() {
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const { id = '' } = useParams();
  const [data, setData] = useState<AlbumTypeProps>({
    isLoading: false,
    album: {} as AlbumType,
    musics: [],
  });
  const { album, musics, isLoading } = data;

  useEffect(() => {
    const getMusicsFetch = async () => {
      setData((prevData) => ({ ...prevData, isLoading: true }));
      const fetchMusic = await getMusics(id);
      const fetchFavorites = await getFavoriteSongs();
      setData((prevData) => ({
        ...prevData,
        album: fetchMusic[0] as AlbumType,
        musics: fetchMusic.slice(1) as SongType[],
      }));
      setFavoriteSongs(fetchFavorites);

      setData((prevData) => ({ ...prevData, isLoading: false }));
    };
    getMusicsFetch();
  }, [id]);

  return (
    isLoading ? (<IsLoading />)
      : (
        <div
          className={ `flex items-center justify-evenly
        text-white text-center dark:bg-gray-900` }
          style={ { minHeight: 'calc(100vh - 57px)' } }
        >
          <div
            className="flex flex-col items-center"
          >
            <h2
              className="text-4xl"
              data-testid="artist-name"
            >
              {album.artistName}

            </h2>
            <img
              className="m-7 h-240 w-240"
              style={ { width: '250px', height: '250px' } }
              src={ album.artworkUrl100 }
              alt={ album.collectionName }
            />
            <h1
              className="text-2xl"
              data-testid="album-name"
            >
              { album.collectionName }

            </h1>
          </div>
          <div
            className="overflow-y-auto p-7"
            style={ { height: '60vh' } }
          >
            {
          musics.map((music: SongType) => (<MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            favoriteSongs={ favoriteSongs }
            favoriteActualization={ setFavoriteSongs }
          />))
        }
          </div>
        </div>
      )
  );
}

export default Album;
