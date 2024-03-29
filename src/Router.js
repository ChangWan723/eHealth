import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from './layouts/full/shared/loadable/Loadable';
import {Register} from "./components/Register";
import {Login} from "./components/Login";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('./layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('./layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('./patient/dashboard/Dashboard')))
const Application = Loadable(lazy(() => import('./patient/appointment/Application')))
const Records = Loadable(lazy(() => import('./patient/appointment/Records')))
const HealthTest = Loadable(lazy(() => import('./patient/history/HealthTest')))
const Medical = Loadable(lazy(() => import('./patient/history/Medical')))
const Prescription = Loadable(lazy(() => import('./patient/history/Prescription')))

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/patient" /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/patient',
    element: <FullLayout />,
    children: [
      { path: '/patient', exact: true, element: <Dashboard /> },
      { path: '/patient/appointment/application', exact: true, element: <Application /> },
      { path: '/patient/appointment/records', exact: true, element: <Records /> },
      { path: '/patient/history/medical', exact: true, element: <Medical /> },
      { path: '/patient/history/healthtest', exact: true, element: <HealthTest /> },
      { path: '/patient/history/prescription', exact: true, element: <Prescription /> },
      { path: '*', element: <Navigate to="/patient/404" /> },
    ],
  }
];

export default Router;
