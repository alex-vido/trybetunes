import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router basename={ process.env.PUBLIC_URL }>
      <Routes>
        <Route index element={ <Login /> } />
        <Route path="/trybetunes" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/profile/edit" element={ <ProfileEdit /> } />
          <Route path="/*" element={ <NotFound /> } />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
