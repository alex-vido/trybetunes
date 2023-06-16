import React, { useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

type SearchProps = {
  nameBand: string,
  isNameBand: boolean,
  isLoading: boolean,
  uploadBand: boolean,
  savedNameBand: string,
  bandData: object[],
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
            { data.bandData.map(
              ({ collectionId, collectionName, artworkUrl100 }: AlbumType) => (
                <li
                  key={ collectionId }
                >
                  <img
                    src={ artworkUrl100 }
                    alt={ collectionName }
                  />
                  <a
                    href={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    {collectionName}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      ) : (
        <h2>Nenhum álbum foi encontrado</h2>
      )}
    </>
  );
}

export default Search;
