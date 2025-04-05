import { RouteObject, Outlet } from 'react-router-dom';
import { lazy } from 'react';

const FormPage = lazy(() => import('./app/page.tsx'));
const Plan = lazy(() => import('./app/plan/[id]/page.tsx'));
const LoginPage = lazy(() => import('./app/login/page.tsx'));
const LandingPage = lazy(() => import('./app/landing-page/page.tsx'));
const MainLayout = lazy(() => import('./app/(main)/layout.tsx'));
const TeamsPage = lazy(() => import('./app/(main)/teams/page.tsx'));
const SocialGPTPage = lazy(() => import('./app/(main)/social-gpt/page.tsx'));
const MarketplacePage = lazy(() => import('./app/(main)/marketplace/page.tsx'));
const KnowledgeHubPage = lazy(
  () => import('./app/(main)/knowledge-hub/page.tsx'),
);
const DashboardPage = lazy(() => import('./app/(main)/dashboard/page.tsx'));
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

  LandingPage: '/landing-page',

  TeamsPage: '/teams',

  SocialGPTPage: '/social-gpt',

  MarketplacePage: '/marketplace',

  KnowledgeHubPage: '/knowledge-hub',

  DashboardPage: '/dashboard',

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
    path: PATH.LandingPage,
    element: <LandingPage />,
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
        path: PATH.TeamsPage,
        element: <TeamsPage />,
      },
      {
        path: PATH.SocialGPTPage,
        element: <SocialGPTPage />,
      },
      {
        path: PATH.MarketplacePage,
        element: <MarketplacePage />,
      },
      {
        path: PATH.KnowledgeHubPage,
        element: <KnowledgeHubPage />,
      },
      {
        path: PATH.DashboardPage,
        element: <DashboardPage />,
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
