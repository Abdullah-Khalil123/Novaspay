import ArticleCreate from '@/components/partials/Articles/ArticleCreate';
import ArticlesPage from '@/pages/Articles';
import { Outlet, type RouteObject } from 'react-router-dom';

const ArticlesRoute: RouteObject = {
  path: 'articles',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <ArticlesPage />,
    },
    {
      path: 'create',
      element: <ArticleCreate action="create" />,
    },
    {
      path: 'edit/:article_id',
      element: <ArticleCreate action="edit" />,
    },
  ],
};

export default ArticlesRoute;
