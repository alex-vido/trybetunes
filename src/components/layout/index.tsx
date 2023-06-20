import { Outlet } from 'react-router-dom';
import Header from '../header';

function Layout() {
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
