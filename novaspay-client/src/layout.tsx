import { Outlet } from 'react-router-dom';
import SideNav from './components/layout/SideNav';
import Header from './components/layout/Header';

const App = () => {
  return (
    <div className="overflow-x-hidden h-screen">
      <main className="w-full flex h-full">
        <SideNav />

        <div className="flex flex-col flex-1">
          <Header />

          {/* Content area */}
          <div className="px-4 flex flex-col flex-1 overflow-y-auto">
            <div className="flex-1">
              <Outlet />
            </div>

            {/* Footer pinned to bottom */}
            <div className="flex justify-center mt-auto py-4 text-sm text-gray-500">
              <p>Copyright © {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
