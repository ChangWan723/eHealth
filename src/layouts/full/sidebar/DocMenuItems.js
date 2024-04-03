import {
  IconAperture,
  IconCalendarClock, IconClipboardHeart,
  IconCopy, IconFileInfo, IconFirstAidKit, IconHeartSearch,
  IconLayoutDashboard, IconLockOpen,
  IconLogin, IconMail,
  IconMoodHappy,
  IconReport, IconStethoscope,
  IconTypography,
  IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const DocMenuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/doctor',
  },
  {
    navlabel: true,
    subheader: 'Pending Items',
  },
  {
    id: uniqueId(),
    title: 'Pending Appointments',
    icon: IconCalendarClock,
    href: '/doctor/pending/appointment',
  },
  {
    id: uniqueId(),
    title: 'Pending Health Tests',
    icon: IconStethoscope,
    href: '/doctor/pending/test',
  },
  {
    navlabel: true,
    subheader: 'Operation',
  },
  {
    id: uniqueId(),
    title: 'Prescribe',
    icon: IconFirstAidKit,
    href: '/doctor/operation/prescribe',
  },
  {
    id: uniqueId(),
    title: 'View / Modify Medical History',
    icon: IconHeartSearch,
    href: '/doctor/operation/medical',
  },
  {
    navlabel: true,
    subheader: 'Records',
  },
  {
    id: uniqueId(),
    title: 'Appointment Records',
    icon: IconReport,
    href: '/doctor/records/appointment',
  },
  {
    id: uniqueId(),
    title: 'Prescription Records',
    icon: IconFirstAidKit,
    href: '/doctor/records/prescription',
  },
  {
    id: uniqueId(),
    title: 'Health Test Records',
    icon: IconStethoscope,
    href: '/doctor/records/healthtest',
  },
  {
    navlabel: true,
    subheader: 'My Profile',
  },
  {
    id: uniqueId(),
    title: 'My Account',
    icon: IconMail,
    href: '/doctor/profile/account',
  },
  {
    id: uniqueId(),
    title: 'Reset Password',
    icon: IconLockOpen,
    href: '/doctor/profile/resetpwd',
  },
];

export default DocMenuitems;
