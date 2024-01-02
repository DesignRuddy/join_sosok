import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface RootLayoutProps {
    children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = (props: any) => {
    const { children } = props;
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ bgcolor: 'rgba(0, 153, 255, 0.1)', height: '100vh' , p: 4, }}>
                    {children}
                </Box>
            </Container>
        </React.Fragment>
    );
}