import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  FileText,
  Users,
  Settings,
  AlignCenterHorizontalIcon,
  Puzzle,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
// import { logout } from '@/actions/auth';
import { toast } from 'sonner';

const sidebarData = [
  {
    label: 'Transactions',
    items: [{ title: 'Transactions', icon: FileText, url: 'transactions' }],
  },
  {
    label: 'Accounts',
    items: [{ title: 'Accounts', icon: Settings, url: 'accounts' }],
  },
  {
    label: 'KYC',
    items: [{ title: 'KYC List', icon: Puzzle, url: 'kyc' }],
  },
  {
    label: 'Clients',
    items: [
      { title: 'Client List', icon: AlignCenterHorizontalIcon, url: 'clients' },
    ],
  },
  {
    label: 'Virtual Accounts (VA)',
    items: [{ title: 'VA List', icon: Users, url: 'vas' }],
  },
  {
    label: 'Onboarding',
    items: [{ title: 'Onboarding List', icon: Users, url: 'onboardings' }],
  },
  // {
  //   label: 'Website Settings',
  //   items: [
  //     {
  //       title: 'Coupon Settings',
  //       icon: Puzzle,
  //       url: '/admin/settings/coupons',
  //     },
  //     {
  //       title: 'Slideshow Settings',
  //       icon: FileText,
  //       url: '/admin/settings/banner',
  //     },
  //     {
  //       title: 'Currency Settings',
  //       icon: Settings,
  //       url: '/admin/settings/currency',
  //     },
  //   ],
  // },
  // {
  //   label: 'Game',
  //   items: [{ title: 'Game List', icon: Puzzle, url: '/admin/games' }],
  // },
  // {
  //   label: 'Service',
  //   items: [
  //     { title: 'Category List', icon: Users, url: '/admin/categorys' },
  //     { title: 'Service List', icon: FileText, url: '/admin/services' },
  //   ],
  // },
  // {
  //   label: 'Supplier & Order',
  //   items: [
  //     {
  //       title: 'Order List',
  //       icon: FileText,
  //       url: '/admin/orders',
  //     },
  //     { title: 'Supplier List', icon: Users, url: '/admin/suppliers' },
  //   ],
  // },
  {
    label: 'User Management',
    items: [{ title: 'User List', icon: Users, url: '/admin/users' }],
  },
];

export function AppSidebar() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Articles: false,
    'Website Settings': false,
    Game: true,
    Service: false,
  });

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }));
  };

  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      {/* Header */}
      <SidebarHeader className="px-4 py-3 border-b text-xl font-bold">
        MMOFOX ADMIN
      </SidebarHeader>

      {/* Groups */}
      <SidebarContent className="overflow-x-hidden">
        {sidebarData.map((group, i) => (
          <div key={group.label}>
            <SidebarGroup>
              <SidebarGroupLabel
                className="px-3 flex items-center justify-between cursor-pointer hover:bg-sidebar-accent rounded-md transition-colors"
                onClick={() => toggleGroup(group.label)}
              >
                <span className="text-sm font-medium">{group.label}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    openGroups[group.label] ? 'rotate-0' : '-rotate-90'
                  }`}
                />
              </SidebarGroupLabel>

              {openGroups[group.label] && (
                <SidebarGroupContent className="mt-1">
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className="flex items-center gap-2 px-3 py-2 ml-3 text-sm rounded hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                          >
                            <item.icon size={16} />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>

            {/* Add separator except after last group */}
            {i < sidebarData.length - 1 && <SidebarSeparator />}
          </div>
        ))}
      </SidebarContent>
      <SidebarFooter className="px-4 py-3 border-t">
        <Button
          onClick={async () => {
            try {
              // await logout()
              //   .then(() => dispatch({ type: 'auth/logout' }))
              //   .finally(() => {
              //     toast.success('Logged out successfully');
              //     navigate('/auth/login');
              //   });
            } catch (error) {
              toast.error('Logout failed');
              console.error(error);
            }
          }}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
