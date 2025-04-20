import express from 'express'
import { generateInvoice } from '../controllers/invoiceController.js'

const router = express.Router()
router.post('/generate-invoice', generateInvoice)
export default router
