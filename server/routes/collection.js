import path from 'path'
import express from 'express'
import { es_client } from '../utils'

const router = express.Router()

router.get('/:handle', (req, res) => {
  const { handle, limit, page } = req.params
  let data = {
    index: `collection_${handle}`,
    size: limit || 10,
    from: page ? page * limit : 0
  }

  es_client.search(data).then(index_res => {
    res.status(200).send(index_res.hits)
  }).catch(err => res.status(500).send(err))
})

export default router