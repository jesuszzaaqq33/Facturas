import express from 'express'
import { getUsers, deleteUser } from '../controllers/userController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/users', verifyToken, getUsers)
router.delete('/users/:username', verifyToken, deleteUser)

export default router
