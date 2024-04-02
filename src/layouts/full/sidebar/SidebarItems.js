import React, {useEffect, useState} from 'react';
import Menuitems from './MenuItems';
import {useLocation} from 'react-router';
import {Box, List} from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import DocMenuitems from "./DocMenuItems";

const SidebarItems = () => {
    const {pathname} = useLocation();
    const pathDirect = pathname;
    const [userType, setUserType] = useState('');

    useEffect(() => {
        // 从 localStorage 中获取 userType
        const userTypeFromStorage = localStorage.getItem('userType');
        setUserType(userTypeFromStorage);
    }, []);


    let itemsToRender = Menuitems;

    // 根据 userType 决定使用哪个菜单项
    if (userType === 'patient') {
        itemsToRender = Menuitems;
    } else if (userType === 'doctor') {
        itemsToRender = DocMenuitems;
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
