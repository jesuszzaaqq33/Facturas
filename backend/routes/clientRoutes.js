import express from 'express'
import { createClient, deleteClient, getClients, updateClient } from '../controllers/clientController.js'
import { authenticateUser } from '../middleware/authMiddleware.js' // 🔐 Middleware para verificar el usuario
const router = express.Router()

// Registrar un nuevo cliente
router.post('/', authenticateUser, createClient)

// Obtener todos los clientes
router.get('/', authenticateUser, getClients)

router.delete('/:clientId', authenticateUser, deleteClient)

router.put('/:clientId', authenticateUser, updateClient)

export default router
