import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import IsLoading from '../is_loading';
import noPhoto from '../../images/no_photo.png';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  const { name, email, image, description } = user;

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const userData = await getUser();
      setUser(userData);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) return (<IsLoading />);
  return (
    <div>
      <img src={ image ?? noPhoto } alt="user" data-testid="profile-image" />
      <NavLink
        to="/profile/edit"
      >
        Editar perfil
      </NavLink>
      <p>Nome</p>
      <h2>{name}</h2>
      <h3>E-mail</h3>
      <h3>{email}</h3>
      <p>Descrição</p>
      <h2>{description}</h2>
    </div>

  );
}

export default Profile;
