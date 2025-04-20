import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { PORT, MONGODB_URI } from './config/config.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import invoiceRoutes from './routes/invoiceRoutes.js'
// import { User } from './models/User.js' // Asegúrate de que la ruta sea correcta
// import { Client } from './models/Client.js'
import cookieParser from 'cookie-parser' // 👈 Importar
import clientRoutes from './routes/clientRoutes.js'

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
    // await Client.deleteMany({})
    // 🔍 Obtener y mostrar todos los usuarios (solo para depuración)
    // const usuarios = await User.find({})
    // console.log('📋 Lista de usuarios:', usuarios)
    // const clientes = await Client.find({})
    // console.log('📋 Lista de clientes:', clientes)
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err)
    process.exit(1) // Cerrar la app si hay un error
  }
}

connectDB()

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api', userRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api', invoiceRoutes)
// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a la API</h1>')
})

// Ruta para crear la factura
// let client = {}
// let user = {}
// let userId = ''
// app.post('/generate-invoice', async (req, res) => {
//   const clientID = req.body.client
//   const { items } = req.body

//   try {
//     client = await Client.findById(clientID) // o findOne({ clientID })

//     if (!client) {
//       return res.status(404).json({ error: 'Cliente no encontrado' })
//     }
//     console.log('📋 Cliente encontrado:', client)
//     userId = client.userId
//     // Resto de lógica para generar la factura...
//   } catch (err) {
//     console.error('❌ Error al buscar el cliente:', err)
//     res.status(500).json({ error: 'Error del servidor' })
//   }
//   try {
//     user = await User.findById(userId)

//     if (!user) {
//       return res.status(404).json({ error: 'Usuario no encontrado' })
//     }
//     console.log('📋 Usuario encontrado:', user)
//     // Resto de lógica para generar la factura...
//   } catch (err) {
//     console.error('❌ Error al buscar el usuario:', err)
//     res.status(500).json({ error: 'Error del servidor' })
//   }
//   // Crear el libro de Excel
//   const workbook = new ExcelJS.Workbook()
//   const worksheet = workbook.addWorksheet('Factura')

//   // Título y encabezados
//   worksheet.addRow(['Factura para:'])
//   worksheet.addRow([client.name || client]) // si solo mandás el ID, ajustalo
//   worksheet.addRow([])
//   worksheet.addRow(['Item', 'Cantidad', 'Precio'])

//   // Agregar los ítems
//   items.forEach(item => {
//     worksheet.addRow([item.name, item.quantity, item.price])
//   })
//   // Total
//   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   worksheet.addRow([])
//   worksheet.addRow(['', 'Total', total])

//   // Configurar respuesta como archivo
//   res.setHeader(
//     'Content-Type',
//     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   )
//   res.setHeader('Content-Disposition', 'attachment; filename=factura.xlsx')

//   // Enviar el Excel como stream
//   await workbook.xlsx.write(res)
//   res.end()
// })

// app.listen(4200, () => {
//   console.log('Backend escuchando en http://localhost:4200')
// })
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
