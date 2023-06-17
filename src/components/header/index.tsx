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
    isLoading ? (<h2>Carregando...</h2>)
      : (
        <header
          data-testid="header-component"
        >
          <NavLink
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisar

          </NavLink>
          <NavLink
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritos

          </NavLink>
          <NavLink
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </NavLink>
          <p
            data-testid="header-user-name"
          >
            { userName }
          </p>
        </header>
      )
  );
}

export default Header;
