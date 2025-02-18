import express from 'express'
import mongoose from 'mongoose'
import { PORT, MONGODB_URI } from './config/config.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

// Middleware para JSON
app.use(express.json())

// Conectar a MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err))

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api', userRoutes)

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a la API</h1>')
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
