import { useEffect } from 'react';
import { getUser } from '../../services/userAPI';

function Profile() {
  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, []);
  return (
    <h2>Teste</h2>
  );
}

export default Profile;
