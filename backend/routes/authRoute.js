import express from 'express';
import { login, logout, register } from '../controllers/authController.js';

const router= express.Router();

// routes
// REGISTER
router.post('/register', register)

// LOGIN
router.post('/login', login);

// LOGOUT
router.post('/logout', logout);

export default router;