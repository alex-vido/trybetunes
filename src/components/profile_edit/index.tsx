import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import IsLoading from '../is_loading';

function ProfileEdit() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const validEmail = (email: string) => {
    if (name.length > 0 && description.length > 0 && image.length > 0) {
      return regexEmail.test(email);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const { name, email, image, description } = user;

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

  if (isLoading) return (<IsLoading />);
  return (
    <form
      className={ `flex flex-col dark:bg-gray-900 
        text-white items-center justify-center` }
      style={ { minHeight: 'calc(100vh - 57px)' } }
    >
      <img src={ image } alt="user" data-testid="profile-image" />
      <label htmlFor="name">Name</label>
      <input
        data-testid="edit-input-name"
        type="text"
        name="name"
        value={ name }
        onChange={ (event) => handleChange(event) }
      />

      <label htmlFor="email">E-mail</label>
      <input
        data-testid="edit-input-email"
        type="text"
        name="email"
        value={ email }
        onChange={ (event) => handleChange(event) }
      />
      <label htmlFor="description">Descrição</label>
      <input
        data-testid="edit-input-description"
        type="text"
        name="description"
        value={ description }
        onChange={ (event) => handleChange(event) }
      />
      <label htmlFor="image">Imagem</label>
      <input
        data-testid="edit-input-image"
        type="text"
        name="image"
        value={ image }
        onChange={ (event) => handleChange(event) }
      />

      <button
        // className={ !validEmail(email) ? 'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' }
        data-testid="edit-button-save"
        disabled={ !validEmail(email) }
        type="button"
        onClick={ handleClickButton }
      >
        salvar
      </button>
    </form>
  );
}

export default ProfileEdit;
