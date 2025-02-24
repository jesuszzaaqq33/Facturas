import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'No autorizado' })

  try {
    const verified = jwt.verify(token, JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).json({ error: 'Token inválido' })
  }
}
