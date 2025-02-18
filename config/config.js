import 'dotenv/config'

export const PORT = process.env.PORT || 5000
export const MONGODB_URI = process.env.MONGODB_URI
export const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_super_segura'
