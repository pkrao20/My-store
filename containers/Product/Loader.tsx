import React from 'react'
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useTheme } from '@/context/themeContext';
const Loader = () => {
    const { theme } = useTheme();
    return (
        <div>

            <div className={`flex justify-center items-center min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
                <Box className="w-full max-w-6xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Skeleton for Image */}
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={400}
                        animation="wave"
                        sx={{ bgcolor: theme === "dark" ? 'grey.800' : 'grey.300', borderRadius: 2 }}
                    />
                    {/* Skeleton for Details */}
                    <div className="flex flex-col gap-4">
                        <Skeleton variant="text" width="60%" height={40} animation="wave" sx={{ bgcolor: theme === "dark" ? 'grey.800' : 'grey.300' }} />
                        <Skeleton variant="text" width="40%" height={30} animation="wave" sx={{ bgcolor: theme === "dark" ? 'grey.800' : 'grey.300' }} />
                        <Skeleton variant="text" width="80%" height={24} animation="wave" sx={{ bgcolor: theme === "dark" ? 'grey.800' : 'grey.300' }} />
                        <Skeleton variant="text" width="90%" height={24} animation="wave" sx={{ bgcolor: theme === "dark" ? 'grey.800' : 'grey.300' }} />
                        <Skeleton variant="rectangular" width="50%" height={50} animation="wave" sx={{ bgcolor: theme === "dark" ? 'grey.800' : 'grey.300', borderRadius: 2 }} />
                    </div>
                </Box>
            </div>
            )</div>
    )
}

export default Loader