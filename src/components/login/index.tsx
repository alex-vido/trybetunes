import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import IsLoading from '../is_loading';

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    isLoading: false,
    userName: '',
    nameValid: false,
  });

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    isNameValid(value);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isNameValid = (value: string) => {
    if (value.length >= 3) {
      setData((prevData) => ({
        ...prevData,
        nameValid: true,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        nameValid: false,
      }));
    }
  };

  const handleButtonClick = async () => {
    setData((prevData) => ({
      ...prevData,
      isLoading: true,
    }));
    await createUser({ name: data.userName });
    setData((prevData) => ({
      ...prevData,
      isLoading: false,
    }));
    navigate('/search');
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-white dark:bg-gray-900"
    >
      {data.isLoading ? (<IsLoading />
      ) : (
        <form
          className="text-center flex flex-col items-center justify-center h-full"
        >
          <h1
            className="text-5xl text-gray-200 mb-9"
          >
            Trybe Tunes

          </h1>
          <input
            type="text"
            data-testid="login-name-input"
            className={ `mb-3 p-3 border border-gray-300 
              rounded-md dark:bg-gray-800 dark:text-gray-200` }
            name="userName"
            placeholder="Digite seu nome:"
            value={ data.userName }
            onChange={ (event) => {
              handleChange(event);
            } }
          />
          <button
            data-testid="login-submit-button"
            className={ `px-6 py-3 text-xl rounded-md dark:bg-gray-800 
              dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100` }
            type="button"
            disabled={ !data.nameValid }
            onClick={ handleButtonClick }
          >
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;
