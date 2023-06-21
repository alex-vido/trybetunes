import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';

function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUserName(user.name);
      setIsLoading(false);
    };
    fetchUser();
  }, []);
  return (
    isLoading ? (
      <header
        className={ `flex items-center justify-between bg-white 
      dark:bg-gray-900 p-4 border-b-2 border-gray-300` }
      >
        <h2
          className="text-2xl text-black dark:text-white"
        >
          Carregando...

        </h2>
      </header>
    )
      : (
        <header
          className={ `flex items-center justify-between bg-white 
          dark:bg-gray-900 p-4  border-b border-gray-300` }
          data-testid="header-component"
        >
          <div className="flex">
            <NavLink
              className="mr-4 text-black dark:text-white"
              to="/search"
              data-testid="link-to-search"
            >
              Pesquisar

            </NavLink>
            <NavLink
              className="mr-4 text-black dark:text-white"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritos

            </NavLink>
            <NavLink
              className="mr-4 text-black dark:text-white"
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </NavLink>
          </div>
          <p
            className="text-ls text-black dark:text-white"
            data-testid="header-user-name"
          >
            { userName }
          </p>
        </header>
      )
  );
}

export default Header;
