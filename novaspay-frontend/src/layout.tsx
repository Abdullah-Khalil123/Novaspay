import { Outlet } from 'react-router-dom';
import SideNav from './components/layout/SideNav';
import Header from './components/layout/Header';

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <main className="w-full flex min-h-screen">
        <SideNav />
        <div className="bg-background flex-1 overflow-x-hidden">
          <Header />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;
