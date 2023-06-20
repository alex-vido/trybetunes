import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import IsLoading from '../is_loading';

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
    return <IsLoading />;
  }

  return (
    <div
      className={ `flex flex-col items-center justify-center 
      text-white pt-4 dark: bg-slate-900` }
      style={ { minHeight: 'calc(100vh - 57px)' } }
    >
      <div>
        <form>
          <input
            className={ `border border-gray-300 mb-2 p-2 mr-1
            rounded-md dark:bg-gray-800 dark:text-gray-200` }
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome da banda ou artista"
            name="nameBand"
            value={ data.nameBand }
            onChange={ (event) => handleChange(event) }
          />
          <button
            className={ `bg-blue-500 text-white px-4 py-2 rounded-md dark:bg-gray-800
              dark:text-white hover:bg-gray-900 dark:hover:text-white 
              border border-gray-800` }
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
        <div
          className="flex-grow bg-gray-900"
        >
          <div className="p-4">
            <h2
              className="text-center text-3xl"
            >
              Resultado de álbuns de:
              {' '}
              { data.savedNameBand }
            </h2>
          </div>
          <div className="overflow-y-auto">
            <ul
              className="grid grid-cols-5 gap-4 p-4"
            >
              { data.bandData.map((album: AlbumType) => {
                const { collectionId, collectionName, artworkUrl100 } = album;
                return (
                  <li
                    className={ `text-black bg-white dark:text-white 
                  dark:bg-gray-900` }
                    key={ collectionId }
                  >
                    <NavLink
                      className={ `text-blue-500 hover:text-blue-700 flex-col  
                      dark:text-white dark:hover:text-blue-500 flex items-center` }
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                    >
                      <img
                        src={ artworkUrl100 }
                        alt={ collectionName }
                      />
                      {collectionName}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div
          className="flex-grow flex items-center justify-center p-4"
        >
          <h2
            className="text-xl"
          >
            Nenhum álbum foi encontrado

          </h2>
        </div>
      )}
    </div>
  );
}

export default Search;
