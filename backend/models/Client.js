import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  cif: { type: String, required: true, unique: true },
  phone: { type: Number },
  address: { type: String, required: true },
  postalCode: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // 🔐 Relación con el usuario

})

export const Client = mongoose.model('Client', clientSchema)
