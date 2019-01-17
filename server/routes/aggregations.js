import path from 'path'
import express from 'express'
import { es_client } from '../utils'

const router = express.Router()

router.post('/', (req, res) => {
  console.log({ size: 0, ...req.body })
  es_client.search({
    index: 'products',
    body: { size: 0, ...req.body }
  }).then(data => { 
    res.status(200).send(data)
  }).catch(err => res.status(500).send(err))
})

export default router