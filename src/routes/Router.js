import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import {Register} from "../components/Register";
import {Login} from "../components/Login";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/dashboard',
    element: <FullLayout />,
    children: [
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/dashboard/sample-page', exact: true, element: <SamplePage /> },
      { path: '/dashboard/icons', exact: true, element: <Icons /> },
      { path: '/dashboard/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/dashboard/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/dashboard/404" /> },
    ],
  }
];

export default Router;
