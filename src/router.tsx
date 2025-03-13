import { RouteObject, Outlet } from 'react-router-dom';
import { lazy } from 'react';

const FormPage = lazy(() => import('./app/page.tsx'));
const Plan = lazy(() => import('./app/plan/[id]/page.tsx'));
const LoginPage = lazy(() => import('./app/login/page.tsx'));
const DatatablePage = lazy(() => import('./app/datatable/page.tsx'));
const MainLayout = lazy(() => import('./app/(main)/layout.tsx'));
const MarketplacePage = lazy(() => import('./app/(main)/marketplace/page.tsx'));
const Home = lazy(() => import('./app/(main)/chat/page.tsx'));
const ChatDetail = lazy(() => import('./app/(main)/chat/[id]/page.tsx'));

export type PlanParams = {
  id: string;
};

export type ChatDetailParams = {
  id: string;
};

export const PATH = {
  FormPage: '/',

  Plan: '/plan/:id',

  LoginPage: '/login',

  DatatablePage: '/datatable',

  MarketplacePage: '/marketplace',

  Home: '/chat',

  ChatDetail: '/chat/:id',
};

export const router: RouteObject[] = [
  {
    path: PATH.FormPage,
    element: <FormPage />,
  },
  {
    path: PATH.Plan,
    element: <Plan />,
  },
  {
    path: PATH.LoginPage,
    element: <LoginPage />,
  },
  {
    path: PATH.DatatablePage,
    element: <DatatablePage />,
  },

  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: PATH.MarketplacePage,
        element: <MarketplacePage />,
      },
      {
        path: PATH.Home,
        element: <Home />,
      },
      {
        path: PATH.ChatDetail,
        element: <ChatDetail />,
      },
    ],
  },
];
