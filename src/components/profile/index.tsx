import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import IsLoading from '../is_loading';
import noPhoto from '../../images/no_photo.png';
import Header from '../header';

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
    <div
      className={ `flex flex-col dark:bg-gray-900 
      text-white items-center justify-center` }
      style={ { minHeight: 'calc(100vh - 57px)' } }
    >
      <div
        className="flex items-center justify-between w-96 mb-24"
      >
        <img
          className="rounded-full w-48 h-48"
          data-testid="profile-image"
          src={ image || noPhoto }
          alt="user"
        />
        <NavLink
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/profile/edit"
        >
          Editar perfil
        </NavLink>
      </div>
      <div
        className="flex flex-col items-start w-96"
      >
        <h3
          className="text-2xl"
        >
          Nome

        </h3>
        <h2
          className="text-xl mb-5"
        >
          {name}

        </h2>
        <h3
          className="text-2xl"
        >
          E-mail

        </h3>
        <h3
          className="text-xl mb-5"
        >
          {email}

        </h3>
        <h3
          className="text-2xl"
        >
          Descrição

        </h3>
        <h3
          className="text-xl mb-5"
        >
          {description}

        </h3>
      </div>
    </div>

  );
}

export default Profile;
