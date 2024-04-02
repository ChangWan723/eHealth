import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './Router';

import { baselightTheme } from "./theme/DefaultColors";

function App() {
    const routing = useRoutes(Router);
    const theme = baselightTheme;

    localStorage.setItem('userType', 'doctor');

    return (
        <ThemeProvider theme={theme}>

            <CssBaseline />
            {routing}

        </ThemeProvider>
    );
}

export default App;
