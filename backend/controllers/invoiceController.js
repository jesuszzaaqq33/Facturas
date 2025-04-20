import ExcelJS from 'exceljs'
import { User } from '../models/User.js'
import { Client } from '../models/Client.js'
import path from 'path'
import moment from 'moment'

export const generateInvoice = async (req, res) => {
  const filePath = path.resolve('files/Factura.xlsx')
  console.log(filePath)
  const { client: clientID, items } = req.body
  //   const clientID = req.body.client
  console.log(items)
  try {
    const client = await Client.findById(clientID)
    if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })
    console.log(client)
    const user = await User.findById(client.userId)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    console.log(user)
    const workbook = new ExcelJS.Workbook()
    // const worksheet = workbook.addWorksheet('Factura')
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet(1)
    if (!worksheet) {
      console.error('❌ Hoja no encontrada')
      return res.status(404).json({ error: 'Hoja no encontrada en el Excel' })
    }
    worksheet.getCell('B3').value = user.username
    worksheet.getCell('B4').value = user.cif
    worksheet.getCell('B5').value = user.address
    worksheet.getCell('B6').value = 'Linares (Jaén), 23700'
    worksheet.getCell('B7').value = user.phone

    worksheet.getCell('E3').value = moment().format('DD/MM/YYYY')
    worksheet.eachRow((row, rowIndex) => {
      row.eachCell((cell, colIndex) => {
        const oldFill = cell.fill
        const oldFont = cell.font
        const oldAlignment = cell.alignment
        const oldBorder = cell.border

        // Modificar el contenido
        if (colIndex === 2) { // Ejemplo: modificar celda B
          cell.value = 'Nuevo Valor'
        }

        // Copiar los estilos
        cell.fill = oldFill
        cell.font = oldFont
        cell.alignment = oldAlignment
        cell.border = oldBorder
      })
    })

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader('Content-Disposition', 'attachment; filename=factura.xlsx')

    await workbook.xlsx.write(res)
    res.end()
  } catch (err) {
    console.error('❌ Error al generar la factura:', err)
    res.status(500).json({ error: 'Error del servidor' })
  }
}
