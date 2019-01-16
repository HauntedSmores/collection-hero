import path from 'path'
import express from 'express'
import { es_client } from '../utils'

const router = express.Router()

router.post('/', (req, res) => {
  console.log(res.body)
  es_client.search({
    index: 'products',
    body: res.body
  }).then(data => {
    res.status(200).send(res.body)
  })
})

export default router