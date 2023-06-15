import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Search from './components/search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> }>
        <Route path="/search" element={ <Search /> } />
      </Route>
      {/* <Route path="/album/:id" element={ <Album /> } />
      <Route path="/favorites" element={ <Favorites /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/profile/edit" element={ <ProfileEdit /> } />
      <Route path="/*" element={ <NotFound /> } /> */}
    </Routes>

  );
}

export default App;
