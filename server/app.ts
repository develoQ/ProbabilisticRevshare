import express from 'express'
import { parsePointerMap, pickPointer, resolvePointer } from './lib/pointers'

const app = express()
app.use(express.json())

// It is important that the full path is specified here
app.get('/pay/:pointer', function (req, res) {
  try {
    const pointerMap = parsePointerMap(req.url)
    const pointer = pickPointer(pointerMap)
    const spspUrl = resolvePointer(pointer)

    return res.redirect(302, spspUrl)
  } catch (e) {
    console.error(e)
    return res.status(404).send(e.message)
  }
})
export { app }
