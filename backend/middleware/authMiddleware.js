import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Acceso denegado, token requerido' })

  try {
    const verified = jwt.verify(token, JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).json({ error: 'Token no válido' })
  }
}
