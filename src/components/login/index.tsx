import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';

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
    <div>
      {data.isLoading ? (
        <h1>Carregando...</h1>
      ) : (
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            name="userName"
            value={ data.userName }
            onChange={ (event) => {
              handleChange(event);
            } }
          />
          <button
            data-testid="login-submit-button"
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
