import { useEffect, useState } from 'react';
import checkedIcon from '../../images/checked_heart.png';
import uncheckedIcon from '../../images/empty_heart.png';
import { removeSong, addSong } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';

type MusicCardProps = {
  trackName: string;
  previewUrl: string;
  trackId: number;
  favoriteSongs: SongType[];
};

function MusicCard({ trackName, previewUrl, trackId, favoriteSongs }: MusicCardProps) {
  const trackIdString: string = trackId.toString();

  const [checkboxState, setCheckboxState] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setCheckboxState(checked);
    if (checked) {
      addSong({ trackName, previewUrl, trackId });
    } else {
      removeSong({ trackName, previewUrl, trackId });
    }
  };

  useEffect(() => {
    const isFavorite = favoriteSongs
      .find((favoriteSong) => favoriteSong.trackId === trackId);
    if (isFavorite) setCheckboxState(true);
    else setCheckboxState(false);
  }, [favoriteSongs, trackId]);

  return (
    <div
      className="flex items-center items-center justify-between"
    >
      <div>
        <p>{ trackName }</p>
      </div>
      <div
        className="flex flex-row items-center"
      >
        <audio
          className="m-2"
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          htmlFor={ trackIdString }
          data-testid={ `checkbox-music-${trackIdString}` }
        >
          <img
            src={
              checkboxState
                ? checkedIcon
                : uncheckedIcon
            }
            alt="favorite"
          />
          <input
            type="checkbox"
            checked={ checkboxState }
            onChange={ (event) => handleCheckboxChange(event) }
            id={ trackIdString }
            style={ { opacity: '0' } }
          />
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
