import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Search from './components/search';
import Album from './components/album';
import Layout from './components/layout';
import Favorites from './components/favorites';
import Profile from './components/profile';
import ProfileEdit from './components/profile_edit';
import NotFound from './components/not_found';

function App() {
  return (
    <Routes>
      <Route index element={ <Login /> } />
      <Route path="/trybetunes" element={ <Layout /> }>
        <Route path="/trybetunes/search" element={ <Search /> } />
        <Route path="/trybetunes/album/:id" element={ <Album /> } />
        <Route path="/trybetunes/favorites" element={ <Favorites /> } />
        <Route path="/trybetunes/profile" element={ <Profile /> } />
        <Route path="/trybetunes/profile/edit" element={ <ProfileEdit /> } />
        <Route path="/trybetunes/*" element={ <NotFound /> } />
      </Route>
    </Routes>

  );
}

export default App;
