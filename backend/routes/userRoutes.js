import express from 'express'
import { getUsers, deleteUser } from '../controllers/userController.js'
import { authenticateUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/users', authenticateUser, getUsers)
router.delete('/users/:username', authenticateUser, deleteUser)

export default router
