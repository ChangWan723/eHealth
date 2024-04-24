import {
    IconLockOpen, IconChecklist
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const AdmMenuitems = [
    {
        navlabel: true,
        subheader: 'Home',
    },

    {
        id: uniqueId(),
        title: 'Approval of Registration',
        icon: IconChecklist,
        href: '/admin',
    },
    {
        id: uniqueId(),
        title: 'Reset Password',
        icon: IconLockOpen,
        href: '/admin/resetpwd',
    },
];

export default AdmMenuitems;
