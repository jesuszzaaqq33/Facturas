import { User } from '../models/User.js'

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password -__v')
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params
    const deletedUser = await User.findOneAndDelete({ username })

    if (!deletedUser) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.json({ message: `Usuario ${username} eliminado correctamente` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
