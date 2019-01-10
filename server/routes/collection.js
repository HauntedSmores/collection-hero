import path from 'path'
import express from 'express'
import { es_client } from '../utils'

const router = express.Router()

router.get('/', (req, res) => {
  es_client.search({index: 'collections', size: 1000}).then(index_res => {
    res.status(200).send(index_res.hits)
  }).catch(err => res.status(500).send(err))
})

router.get('/:handle', (req, res) => {
  const handle = req.params.handle
  const { limit, page } = req.query
  let data = {
    index: `collection_${handle}`,
    size: limit || 10,
    from: page ? (page * limit) - limit : 0
  }

  es_client.search(data).then(index_res => {
    res.status(200).send(index_res.hits)
  }).catch(err => res.status(500).send(err))
})

export default router