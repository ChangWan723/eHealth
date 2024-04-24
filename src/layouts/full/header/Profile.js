import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Avatar,
    Box,
    Menu,
    Button,
    IconButton,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';

import {
    IconClipboardHeart,
    IconFirstAidKit,
    IconHeartSearch,
    IconListCheck,
    IconMail,
    IconReport,
    IconUser
} from '@tabler/icons-react';

import PatientImg from 'src/assets/images/profile/patient.png';
import DoctorImg from 'src/assets/images/profile/doctor.png';
import AdminImg from 'src/assets/images/profile/admin.png';


const Profile = () => {
    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const [userType, setUserType] = useState('');

    useEffect(() => {
        const userTypeFromStorage = localStorage.getItem('userType');
        setUserType(userTypeFromStorage);
    }, []);

    let img = PatientImg;

    if (userType === 'doctor') {
        img = DoctorImg;
    } else if (userType === 'patient') {
        img = PatientImg;
    } else if (userType === 'admin') {
        img = AdminImg;
    }

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    ...(typeof anchorEl2 === 'object' && {
                        color: 'primary.main',
                    }),
                }}
                onClick={handleClick2}
            >
                <Avatar
                    src={img}
                    alt={img}
                    sx={{
                        width: 35,
                        height: 35,
                    }}
                />
            </IconButton>
            {/* ------------------------------------------- */}
            {/* Message Dropdown */}
            {/* ------------------------------------------- */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '200px',
                    },
                }}
            >
                {userType === 'patient' && (
                    <>
                        <MenuItem button component={Link} to="/patient/records/appointment">
                            <ListItemIcon>
                                <IconReport width={20}/>
                            </ListItemIcon>
                            <ListItemText>My Appointments</ListItemText>
                        </MenuItem>
                        <MenuItem button component={Link} to="/patient/profile/medical">
                            <ListItemIcon>
                                <IconClipboardHeart width={20}/>
                            </ListItemIcon>
                            <ListItemText>My Medical History</ListItemText>
                        </MenuItem>
                        <MenuItem button component={Link} to="/patient/profile/account">
                            <ListItemIcon>
                                <IconMail width={20}/>
                            </ListItemIcon>
                            <ListItemText>My Account</ListItemText>
                        </MenuItem>
                    </>)}
                {userType === 'doctor' && (
                    <>
                        <MenuItem button component={Link} to="/doctor/operation/prescribe">
                            <ListItemIcon>
                                <IconFirstAidKit width={20}/>
                            </ListItemIcon>
                            <ListItemText>Prescribe</ListItemText>
                        </MenuItem>
                        <MenuItem button component={Link} to="/doctor/operation/medical">
                            <ListItemIcon>
                                <IconHeartSearch width={20}/>
                            </ListItemIcon>
                            <ListItemText>Medical History</ListItemText>
                        </MenuItem>
                        <MenuItem button component={Link} to="/patient/profile/account">
                            <ListItemIcon>
                                <IconMail width={20}/>
                            </ListItemIcon>
                            <ListItemText>My Account</ListItemText>
                        </MenuItem>
                    </>
                )}

                <Box mt={1} py={1} px={2}>
                    <Button to="/home" variant="outlined" color="primary" component={Link} fullWidth>
                        Logout
                    </Button>
                </Box>
            </Menu>
        </Box>
    )
        ;
};

export default Profile;
