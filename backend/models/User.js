import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nameCompany: { type: String, required: true },
  cif: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number }
})
export const User = mongoose.model('User', UserSchema)
