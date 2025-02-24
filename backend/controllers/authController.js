import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { JWT_SECRET } from '../config/config.js'

export const register = async (req, res) => {
  try {
    let { username, password } = req.body

    // 1️⃣ Validaciones básicas
    if (!username || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    // 2️⃣ Limpiar entrada
    username = username.trim().toLowerCase()
    password = password.trim()
    const existingUser = await User.findOne({ username })
    if (existingUser) return res.status(400).json({ error: 'El usuario ya existe' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword })
    await user.save()

    res.json({ message: 'Usuario registrado correctamente' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    let { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }
    username = username.trim().toLowerCase()
    password = password.trim()
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' })

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' })
    // 6️⃣ Guardar token en una cookie segura
    res.cookie('token', token, {
      httpOnly: true, // El token no es accesible por JavaScript en el frontend
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      sameSite: 'strict', // Protege contra ataques CSRF
      maxAge: 3600000 // 1 hora
    })
    res.json({ message: 'Login exitoso', token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
export const logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })
  res.json({ message: 'Logout exitoso' })
}
