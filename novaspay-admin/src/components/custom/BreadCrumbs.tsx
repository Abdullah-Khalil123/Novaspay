import { useLocation, Link, useMatches } from 'react-router-dom';

const ROUTE_NAME_MAP: { [key: string]: string } = {
  '/admin': 'Dashboard',
  '/admin/games': 'Games',
  '/admin/games/create': 'Create Game',
  '/admin/games/edit/:gameId': 'Edit Game',
  '/admin/games/:gameId': 'Game Details', // This will need dynamic naming
  '/admin/articles': 'Articles',
  '/admin/articles/create': 'Create Article',
  '/admin/articles/edit/:article_id': 'Edit Article',
  '/admin/authors': 'Authors',
  '/admin/categorys': 'Categories',
  '/admin/categorys/:gameId': 'Category Details', // Dynamic
  '/admin/orders': 'Orders',
  '/admin/orders/create': 'Create Order',
  '/admin/orders/view/:orderId': 'View Order', // Dynamic
  '/admin/servers': 'Servers',
  '/admin/servers/:gameId': 'Servers for Game', // Dynamic
  '/admin/servers/:gameId/sub-server/:parentId': 'Sub-Servers', // Dynamic
  '/admin/services': 'Services',
  '/admin/services/:gameId': 'Services for Game', // Dynamic
  '/admin/services/:gameId/create': 'Create Service',
  '/admin/services/:gameId/edit/:serviceId': 'Edit Service',
  '/admin/services/:gameId/extra/:serviceId': 'Service Extras',
  '/admin/services/:gameId/other/:serviceId': 'Service Others',
  '/admin/services/:gameId/config/gold/:serviceId': 'Gold Service Config',
  '/admin/services/:gameId/config/Ranked Leveling/:serviceId':
    'Ranked Service Config',
  '/admin/services/:gameId/config/Tiered Leveling/:serviceId':
    'Tiered Service Config',
  '/admin/settings': 'Settings',
  '/admin/settings/currency': 'Currency Settings',
  '/admin/settings/banner': 'Banner Settings',
  '/admin/settings/coupons': 'Coupons Settings',
  '/admin/settings/feedback': 'Feedback Settings',
  '/admin/settings/navigation': 'Navigation Settings',
  '/admin/suppliers': 'Suppliers',
  '/admin/suppliers/create': 'Create Supplier',
  '/admin/suppliers/edit/:supplierId': 'Edit Supplier',
};

// Extend UIMatch to include optional crumb

const getBreadcrumbName = (match: any): string | null => {
  if (match.handle?.crumb) return match.handle.crumb;

  // Check static route map
  if (ROUTE_NAME_MAP[match.pathname]) {
    return ROUTE_NAME_MAP[match.pathname];
  }

  // Fallback: use last path segment
  const segments = match.pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const lastSegment = segments[segments.length - 1];
    if (/^\d+$/.test(lastSegment)) {
      return `ID ${lastSegment}`;
    }
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }

  return null;
};

const CustomBreadcrumbs = () => {
  const location = useLocation();
  const matches = useMatches() as any[];

  const crumbs = matches
    .filter((m) => m.pathname !== '/')
    .map((match, index) => {
      const isLast = index === matches.length - 1;
      const name = getBreadcrumbName(match);
      if (!name) return null;

      return (
        <li key={match.pathname} className="flex items-center gap-2">
          {!isLast ? (
            <Link
              to={match.pathname}
              className="text-sm font-medium hover:underline"
            >
              {name}
            </Link>
          ) : (
            <span className="text-sm font-semibold text-gray-900">{name}</span>
          )}
          {!isLast && <span className="text-gray-400">/</span>}
        </li>
      );
    });

  // Add Dashboard if not present
  if (
    crumbs.length > 0 &&
    !crumbs.find((c) => String(c?.key) === '/admin') &&
    location.pathname !== '/admin'
  ) {
    crumbs.unshift(
      <li key="/admin" className="flex items-center gap-2">
        <Link
          to="/admin"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Dashboard
        </Link>
        <span className="text-gray-400">/</span>
      </li>
    );
  }

  // Handle /admin root
  if (location.pathname === '/admin' && crumbs.length === 0) {
    crumbs.push(
      <li key="/admin">
        <span className="text-sm font-semibold text-gray-900">Dashboard</span>
      </li>
    );
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">{crumbs}</ol>
    </nav>
  );
};

export default CustomBreadcrumbs;
