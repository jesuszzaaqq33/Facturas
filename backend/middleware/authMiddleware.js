import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'
import { User } from '../models/User.js'
export const authenticateUser = async (req, res, next) => {
  try {
    // console.log('🔍 Cookies recibidas:', req.cookies)
    const token = req.cookies.token // 🔐 Leer el token desde las cookies

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) // 🔍 Verificar el token
    const user = await User.findById(decoded.id).select('-password') // 🛑 Excluir la contraseña

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' })
    }

    req.user = user // 🔑 Guardamos el usuario en la petición
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' })
  }
}
