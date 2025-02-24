import express from 'express'
import { register, login, logout } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/check-auth', (req, res) => {
  if (req.cookies.token) {
    return res.json({ authenticated: true })
  } else {
    return res.status(401).json({ error: 'No autenticado' })
  }
})

export default router
