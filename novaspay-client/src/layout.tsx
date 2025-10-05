import { Outlet } from 'react-router-dom';
import SideNav from './components/layout/SideNav';
import Header from './components/layout/Header';

const App = () => {
  return (
    <div className="overflow-x-hidden h-screen">
      <main className="w-full flex h-full">
        <SideNav />

        <div className="bg-background flex flex-col flex-1">
          <Header />

          {/* Content area */}
          <div className="px-4 flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
