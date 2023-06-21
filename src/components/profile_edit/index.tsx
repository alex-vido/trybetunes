import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import IsLoading from '../is_loading';
import noPhoto from '../../images/no_photo.png';

function ProfileEdit() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  const { name, email, image, description } = user;

  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const validation = (name.length > 0 && description.length > 0 && image.length > 0 && regexEmail.test(email))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleClickButton = async () => {
    setIsLoading(true);
    await updateUser({ name, email, image, description });
    navigate('/profile');
  };

  const disabled = `bg-blue-500 text-white font-bold py-2 px-4 
    rounded opacity-50 cursor-not-allowed`;
  const enabled = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  
  if (isLoading) return (<IsLoading />);
  return (
    <form
      className={ `flex flex-col dark:bg-gray-900 
        text-white items-center justify-center` }
      style={ { minHeight: 'calc(100vh - 57px)' } }
    >
      <img
        className="rounded-full w-48 h-48 m-9"
        src={ image || noPhoto }
        alt="user"
        data-testid="profile-image"
      />
      <label
        className="text-xl"
        htmlFor="name"
      >
        Name

      </label>
      <input
        className={ `border border-gray-300 p-1 mb-2 mr-1
      rounded-md dark:bg-gray-800 dark:text-gray-200` }
        data-testid="edit-input-name"
        type="text"
        name="name"
        value={ name }
        onChange={ (event) => handleChange(event) }
      />

      <label
        className="text-xl"
        htmlFor="email"
      >
        E-mail

      </label>
      <input
        className={ `border border-gray-300 mb-2 p-1 mr-1
          rounded-md dark:bg-gray-800 dark:text-gray-200` }
        data-testid="edit-input-email"
        type="text"
        name="email"
        value={ email }
        onChange={ (event) => handleChange(event) }
      />
      <label
        className="text-xl"
        htmlFor="description"
      >
        Descrição

      </label>
      <input
        className={ `border border-gray-300 mb-2 p-1 mr-1
          rounded-md dark:bg-gray-800 dark:text-gray-200` }
        data-testid="edit-input-description"
        type="text"
        name="description"
        value={ description }
        onChange={ (event) => handleChange(event) }
      />
      <label
        className="text-xl"
        htmlFor="image"
      >
        Imagem

      </label>
      <input
        className={ `border border-gray-300 p-1 mb-2 mr-1
          rounded-md dark:bg-gray-800 dark:text-gray-200` }
        data-testid="edit-input-image"
        type="text"
        name="image"
        value={ image }
        onChange={ (event) => handleChange(event) }
      />

      <button
        className={ validation
          ? enabled
          : disabled }
        data-testid="edit-button-save"
        disabled={ !validation }
        type="button"
        onClick={ handleClickButton }
      >
        salvar
      </button>
    </form>
  );
}

export default ProfileEdit;
