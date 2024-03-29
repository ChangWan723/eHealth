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
    href: '/patient/appointment/records',
  },
  {
    id: uniqueId(),
    title: 'Prescription History',
    icon: IconLogin,
    href: '/patient/history/prescription',
  },
  {
    id: uniqueId(),
    title: 'Health Test History',
    icon: IconUserPlus,
    href: '/patient/history/healthtest',
  },
  {
    navlabel: true,
    subheader: 'My Profile',
  },
  {
    id: uniqueId(),
    title: 'My Medical History',
    icon: IconLogin,
    href: '/patient/history/medical',
  },
  {
    id: uniqueId(),
    title: 'My Account',
    icon: IconMoodHappy,
  },
];

export default Menuitems;
