import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from './layouts/full/shared/loadable/Loadable';
import {Register} from "./components/Register";
import {Login} from "./components/Login";

const FullLayout = Loadable(lazy(() => import('./layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('./layouts/blank/BlankLayout')));

const Dashboard = Loadable(lazy(() => import('./patient/dashboard/Dashboard')))
const Application = Loadable(lazy(() => import('./patient/appointment/Application')))
const Appointments = Loadable(lazy(() => import('./patient/records/Appointment')))
const HealthTest = Loadable(lazy(() => import('./patient/records/HealthTest')))
const Prescription = Loadable(lazy(() => import('./patient/records/Prescription')))
const Medical = Loadable(lazy(() => import('./patient/profile/Medical')))
const Account = Loadable(lazy(() => import('./patient/profile/Account')))
const ResetPwd = Loadable(lazy(() => import('./patient/profile/ResetPwd')))

const DocDashboard = Loadable(lazy(() => import('./doctor/dashboard/Dashboard')))
const PendingAppointment = Loadable(lazy(() => import('./doctor/pending/PendingAppointment')))
const PendingTest = Loadable(lazy(() => import('./doctor/pending/PendingTest')))


const DocAppointments = Loadable(lazy(() => import('./doctor/records/Appointment')))
const DocHealthTest = Loadable(lazy(() => import('./doctor/records/HealthTest')))
const DocPrescription = Loadable(lazy(() => import('./doctor/records/Prescription')))
const DocAccount = Loadable(lazy(() => import('./doctor/profile/Account')))
const DocResetPwd = Loadable(lazy(() => import('./doctor/profile/ResetPwd')))

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/doctor" /> },
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
      { path: '/patient/records/appointment', exact: true, element: <Appointments /> },
      { path: '/patient/records/healthtest', exact: true, element: <HealthTest /> },
      { path: '/patient/records/prescription', exact: true, element: <Prescription /> },
      { path: '/patient/profile/medical', exact: true, element: <Medical /> },
      { path: '/patient/profile/account', exact: true, element: <Account /> },
      { path: '/patient/profile/resetpwd', exact: true, element: <ResetPwd /> },
      { path: '*', element: <Navigate to="/patient/404" /> },
    ],
  },
  {
    path: '/doctor',
    element: <FullLayout />,
    children: [
      { path: '/doctor', exact: true, element: <DocDashboard /> },
      { path: '/doctor/pending/appointment', exact: true, element: <PendingAppointment /> },
      { path: '/doctor/pending/test', exact: true, element: <PendingTest /> },
      { path: '/doctor/records/appointment', exact: true, element: <DocAppointments /> },
      { path: '/doctor/records/healthtest', exact: true, element: <DocHealthTest /> },
      { path: '/doctor/records/prescription', exact: true, element: <DocPrescription /> },
      { path: '/doctor/profile/account', exact: true, element: <DocAccount /> },
      { path: '/doctor/profile/resetpwd', exact: true, element: <DocResetPwd /> },
      { path: '*', element: <Navigate to="/doctor/404" /> },
    ],
  }
];

export default Router;
