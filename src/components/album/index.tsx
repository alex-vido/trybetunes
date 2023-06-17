import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../music_card';
import { AlbumType, SongType } from '../../types';

  type AlbumTypeProps = {
    isLoading: boolean
    album: AlbumType
    musics: SongType[]
  };

function Album() {
  const { id } = useParams();
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
      setData((prevData) => ({
        ...prevData,
        album: fetchMusic[0] as AlbumType,
        musics: fetchMusic.slice(1) as SongType[],
      }));
      setData((prevData) => ({ ...prevData, isLoading: false }));
    };
    getMusicsFetch();
  }, []);

  return (
    isLoading ? (<h2>Carregando...</h2>)
      : (
        <div>
          <h1 data-testid="album-name">{ album.collectionName }</h1>
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          <h2 data-testid="artist-name">{album.artistName}</h2>
          {
          musics.map((music: SongType) => (<MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />))
        }
        </div>
      )
  );
}

export default Album;
