import { Outlet } from 'react-router-dom';
import SideNav from './components/layout/SideNav';
import Header from './components/layout/Header';

const App = () => {
  return (
    <div>
      <main className="w-full flex min-h-screen">
        <SideNav />
        <div className="bg-background text-white w-full">
          <Header />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;
