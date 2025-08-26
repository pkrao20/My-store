import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { useTheme } from '@/context/themeContext';

const Loader = () => {
    const { theme } = useTheme();
    
    const skeletonArray = Array.from({ length: 12 });

    return (
        skeletonArray.map((_, idx) => (
            <Box key={idx} className="rounded-lg overflow-hidden">
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={200}
                    animation="wave"
                    sx={{
                        bgcolor: theme === 'dark' ? 'grey.800' : 'grey.300'
                    }}
                />
                <Skeleton
                    variant="text"
                    width="80%"
                    height={30}
                    animation="wave"
                    sx={{ mt: 1, bgcolor: theme === 'dark' ? 'grey.800' : 'grey.300' }}
                />
                <Skeleton
                    variant="text"
                    width="60%"
                    height={30}
                    animation="wave"
                    sx={{ mt: 1, bgcolor: theme === 'dark' ? 'grey.800' : 'grey.300' }}
                />
            </Box>
        ))
    )
}

export default Loader