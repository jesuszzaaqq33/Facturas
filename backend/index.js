import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { PORT, MONGODB_URI } from './config/config.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { User } from './models/User.js' // Asegúrate de que la ruta sea correcta
import cookieParser from 'cookie-parser' // 👈 Importar

const app = express()
app.use(express.json())
// Opción más segura: Permitir solo Angular (4200)
app.use(cors({
  origin: 'http://localhost:4200', // Permite solo este dominio
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}))
// Middleware para JSON

app.use(cookieParser())
// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Conectado a MongoDB Atlas')
    // 🗑️ Eliminar todos los usuarios
    // await User.deleteMany({})
    // console.log('⚠️ Todos los usuarios han sido eliminados.')

    // 🔍 Obtener y mostrar todos los usuarios (solo para depuración)
    const usuarios = await User.find({})
    console.log('📋 Lista de usuarios:', usuarios)
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err)
    process.exit(1) // Cerrar la app si hay un error
  }
}

connectDB()

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
