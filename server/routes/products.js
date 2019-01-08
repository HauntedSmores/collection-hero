import express from 'express'
import axios from 'axios'
import { http } from '../utils'

const router = express.Router()

function get_products(query) {
  const { limit, page } = query;
  return http.get('products.json', {
      params: {
          limit: limit ? limit: 20,
          page: page ? page : 1
      }
  })
}

function get_product_count() {
  return http.get('products/count.json')
}

router.get('/', (req, res) => {
  axios.all([get_products(req.query), get_product_count()])
      .then(axios.spread((products_res, count_res) => {
          let data = {
              products: products_res.data.products,
              count: count_res.data.count
          }
          res.status(200).json(data)
      })).catch(err => res.status(500).send(err))
})

export default router