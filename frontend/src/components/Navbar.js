import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            width: '100%',
            p: '1rem 6%',
            textAlign: 'center',
            boxShadow: 3,
            mb: 2,
            backgroundColor: "#202123",
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Typography variant='h1' color='primary'
                sx={{
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
                onClick={() => navigate('/')}>
                CoolGPT
            </Typography>
            {localStorage.getItem("authToken") === 'true' ?
                <Box sx={{
                    fontSize: 20,
                }}>
                    <Link href='/' underline='none' onClick={()=>{localStorage.setItem('authToken', false)}}>Logout</Link>
                </Box> :
                <Box sx={{
                    fontSize: 20,
                }}>
                    <Link href='/register' underline='none'>Register</Link>
                    <Link href='/login' underline='none' >Login</Link>
                </Box>
                }

        </Box>
    )
}

export default Navbar