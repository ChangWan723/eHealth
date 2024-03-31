import {
  IconAperture,
  IconCalendarClock, IconClipboardHeart,
  IconCopy, IconFileInfo, IconFirstAidKit,
  IconLayoutDashboard, IconLockOpen,
  IconLogin, IconMail,
  IconMoodHappy,
  IconReport, IconStethoscope,
  IconTypography,
  IconUserPlus
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
    icon: IconCalendarClock,
    href: '/patient/appointment/application',
  },
  {
    navlabel: true,
    subheader: 'Records',
  },
  {
    id: uniqueId(),
    title: 'Appointment Records',
    icon: IconReport,
    href: '/patient/records/appointment',
  },
  {
    id: uniqueId(),
    title: 'Prescription Records',
    icon: IconFirstAidKit,
    href: '/patient/records/prescription',
  },
  {
    id: uniqueId(),
    title: 'Health Test Records',
    icon: IconStethoscope,
    href: '/patient/records/healthtest',
  },
  {
    navlabel: true,
    subheader: 'My Profile',
  },
  {
    id: uniqueId(),
    title: 'My Medical History',
    icon: IconClipboardHeart,
    href: '/patient/profile/medical',
  },
  {
    id: uniqueId(),
    title: 'My Account',
    icon: IconMail,
    href: '/patient/profile/account',
  },
  {
    id: uniqueId(),
    title: 'Reset Password',
    icon: IconLockOpen,
    href: '/patient/profile/resetpwd',
  },
];

export default Menuitems;
