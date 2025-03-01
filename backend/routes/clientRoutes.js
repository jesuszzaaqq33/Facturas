import express from 'express'
import { Client } from '../models/Client.js'
import { authenticateUser } from '../middleware/authMiddleware.js' // 🔐 Middleware para verificar el usuario
const router = express.Router()

// 📌 Ruta para registrar un nuevo cliente
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { name, email } = req.body
    const userId = req.user.id
    const newClient = new Client({ name, email, userId })
    await newClient.save()
    res.status(201).json({ message: 'Client registered successfully!', client: newClient })
  } catch (error) {
    res.status(400).json({ message: 'Error registering client', error })
  }
})

// 📌 Ruta para obtener todos los clientes
router.get('/', authenticateUser, async (req, res) => {
  try {
    // const userId = req.user.id // 🔑 Solo obtenemos los clientes de este usuario
    console.log('🔹 Usuario autenticado:', req.user)
    const userId = req.user?.id
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' })
    }
    const allClients = await Client.find({})
    console.log('📋 Todos los clientes en la BD:', allClients)

    const clients = await Client.find({ userId })
    console.log('📋 Clientes encontrados:', clients)
    res.json(clients)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error })
  }
})

export default router
