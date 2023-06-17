import { useState } from 'react';
import checked from '../../images/checked_heart.png';
import unchecked from '../../images/empty_heart.png';

type MusicCardProps = {
  trackName: string;
  previewUrl: string;
  trackId: number;
  trackIdString: string,
};

function MusicCard({ trackName, previewUrl, trackId }: MusicCardProps) {
  const trackIdString = trackId.toString();
  const [checkboxState, setCheckboxState] = useState<{
    [key: number]: boolean }>({ [trackIdString]: false });

  const handleCheckboxChange = () => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [trackIdString]: !prevState[trackIdString],
    }));
  };

  const isChecked = checkboxState[trackIdString] || false;

  return (
    <div>
      <p>{ trackName }</p>
      <audio
        data-testid="audio-component"
        src={ previewUrl }
        controls
      >
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <label
        htmlFor={ `check-${trackIdString}` }
        data-testid={ `checkbox-music-${trackIdString}` }
      >
        <img
          src={
            isChecked
              ? checked
              : unchecked
            }
          alt="favorite"
        />
      </label>
      <input
        checked={ isChecked }
        type="checkbox"
        onChange={ handleCheckboxChange }
        id={ `check-${trackIdString}` }
        style={ { display: 'none' } }
      />

    </div>
  );
}

export default MusicCard;
