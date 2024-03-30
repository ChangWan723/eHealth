import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/patient',
  },
  {
    navlabel: true,
    subheader: 'Appointments',
  },
  {
    id: uniqueId(),
    title: 'Book an Appointment',
    icon: IconTypography,
    href: '/patient/appointment/application',
  },
  {
    navlabel: true,
    subheader: 'Records',
  },
  {
    id: uniqueId(),
    title: 'Appointment Records',
    icon: IconTypography,
    href: '/patient/records/appointment',
  },
  {
    id: uniqueId(),
    title: 'Prescription Records',
    icon: IconLogin,
    href: '/patient/records/prescription',
  },
  {
    id: uniqueId(),
    title: 'Health Test Records',
    icon: IconUserPlus,
    href: '/patient/records/healthtest',
  },
  {
    navlabel: true,
    subheader: 'My Profile',
  },
  {
    id: uniqueId(),
    title: 'My Medical History',
    icon: IconLogin,
    href: '/patient/profile/medical',
  },
  {
    id: uniqueId(),
    title: 'My Account',
    icon: IconMoodHappy,
    href: '/patient/profile/account',
  },
  {
    id: uniqueId(),
    title: 'Reset Password',
    icon: IconMoodHappy,
    href: '/patient/profile/resetpwd',
  },
];

export default Menuitems;
