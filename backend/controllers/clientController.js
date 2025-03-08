import { Client } from '../models/Client.js'

// 📌 Registrar un nuevo cliente
export const createClient = async (req, res) => {
  try {
    const { name, email, cif, phone, address } = req.body
    const userId = req.user.id
    const newClient = new Client({ name, email, userId, cif, phone, address })
    await newClient.save()
    res.status(201).json({ message: 'Client registered successfully!', client: newClient })
  } catch (error) {
    res.status(400).json({ message: 'Error registering client', error })
  }
}
// 📌 Obtener todos los clientes
export const getClients = async (req, res) => {
  try {
    // console.log('🔹 Usuario autenticado:', req.user)
    const userId = req.user?.id
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' })
    }

    const clients = await Client.find({ userId }) // 🔑 Solo los clientes de este usuario
    // console.log('📋 Clientes encontrados:', clients)
    res.json(clients)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error })
  }
}

export const deleteClient = async (req, res) => {
  try {
    const { clientId } = req.params
    const deletedClient = await Client.findByIdAndDelete(clientId)
    if (!deletedClient) {
      return res.status(404).json({ error: 'Cliente no encontrado' })
    }

    res.json({ message: `Cliente ${deletedClient.name} eliminado correctamente` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
