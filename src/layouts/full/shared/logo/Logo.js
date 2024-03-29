import {Link} from 'react-router-dom';
import {styled} from '@mui/material';
import Box from "@mui/material/Box";

// Styled components using MUI's 'styled' utility
const LinkStyled = styled(Link)(({theme}) => ({
    fontSize: '40px',
    fontWeight: 'bold',
    color: theme.palette.primary.main, // Use theme colors for better theming support
    textShadow: '2px 2px 4px #aaa',
}));

const StyledE = styled('span')(({theme}) => ({
    color: theme.palette.secondary.main,
    fontStyle: 'italic',
}));

const Logo = () => {
    return (
        <Box m={3}> {/* Adds margin around the Logo */}
            <LinkStyled to="/">
                <StyledE>e</StyledE>Health
            </LinkStyled>
        </Box>
    )
};

export default Logo;
