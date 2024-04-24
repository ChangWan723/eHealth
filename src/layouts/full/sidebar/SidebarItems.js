import React, {useEffect, useState} from 'react';
import Menuitems from './MenuItems';
import {useLocation} from 'react-router';
import {Box, List} from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import DocMenuitems from "./DocMenuItems";
import AdmMenuitems from "./AdmMenuItems";

const SidebarItems = () => {
    const {pathname} = useLocation();
    const pathDirect = pathname;
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const userTypeFromStorage = localStorage.getItem('userType');
        setUserType(userTypeFromStorage);
    }, []);


    let itemsToRender = Menuitems;

    if (userType === 'patient') {
        itemsToRender = Menuitems;
    } else if (userType === 'doctor') {
        itemsToRender = DocMenuitems;
    } else if (userType === 'admin') {
        itemsToRender = AdmMenuitems;
    }
    return (
        <Box sx={{px: 3}}>
            <List sx={{pt: 0}} className="sidebarNav">
                {itemsToRender.map((item) => {
                    if (item.subheader) {
                        return <NavGroup item={item} key={item.subheader}/>;
                    } else {
                        return (
                            <NavItem item={item} key={item.id} pathDirect={pathDirect}/>
                        );
                    }
                })}
            </List>
        </Box>
    );
};
export default SidebarItems;
