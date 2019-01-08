import path from 'path'
import express from 'express'
import yaml from 'node-yaml'

const router = express.Router()

router.post('/', (req, res) => {
  yaml.write(path.resolve(__dirname, '../.store-config.yml'), req.body, (err) => {
      if (err) {
          res.status(500).send(err)
      } else {
          res.status(200).send('Config saved')
      }
  })
})

router.get('/', (req, res) => {
  yaml.read(path.resolve(__dirname, '../.store-config.yml'), (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

export default router