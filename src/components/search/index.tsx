import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

type SearchProps = {
  nameBand: string,
  isNameBand: boolean,
  isLoading: boolean,
  uploadBand: boolean,
  savedNameBand: string,
  bandData: AlbumType[],
};

function Search() {
  const [data, setData] = useState<SearchProps>({
    nameBand: '',
    isNameBand: false,
    isLoading: false,
    uploadBand: false,
    savedNameBand: '',
    bandData: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    nameBandValidator(value);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nameBandValidator = (value: string) => {
    if (value.length >= 2) {
      setData((prevData) => ({
        ...prevData,
        isNameBand: true,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        isNameBand: false,
      }));
    }
  };

  const handleClickButton = async () => {
    setData((prevData) => ({
      ...prevData,
      savedNameBand: data.nameBand,
      isLoading: true,
    }));
    const albums = await searchAlbumsAPI(data.nameBand);
    setData((prevData) => ({
      ...prevData,
      bandData: albums,
      nameBand: '',
      isLoading: false,
      uploadBand: true,
    }));
  };

  if (data.isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <div>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome da banda ou artista"
            name="nameBand"
            value={ data.nameBand }
            onChange={ (event) => handleChange(event) }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ !data.isNameBand }
            onClick={ handleClickButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
      { data.uploadBand && data.bandData.length > 0 ? (
        <div>
          <h2>
            Resultado de álbuns de:
            {' '}
            { data.savedNameBand }
          </h2>
          <ul>
            { data.bandData.map((album: AlbumType) => {
              const { collectionId, collectionName, artworkUrl100 } = album;
              return (
                <li
                  key={ collectionId }
                >
                  <img
                    src={ artworkUrl100 }
                    alt={ collectionName }
                  />
                  <NavLink
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    {collectionName}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <h2>Nenhum álbum foi encontrado</h2>
      )}
    </>
  );
}

export default Search;
