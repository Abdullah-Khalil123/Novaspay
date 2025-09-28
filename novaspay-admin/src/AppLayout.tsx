import { Outlet } from 'react-router-dom';
import { AppSidebar } from './components/layout/sideNav';
import { SidebarProvider } from './components/ui/sidebar';
import Breadcrumb from './components/layout/header';

const AppLayout = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full px-8 max-h-screen overflow-y-auto">
          {/* <SidebarTrigger /> */}
          <Breadcrumb />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
