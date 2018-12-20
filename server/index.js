import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'

dotenv.config()

const app = express()
const port = 5000
const apiKey = process.env.SHOPIFY_API_KEY
const apiSecret = process.env.SHOPIFY_API_SECRET
const shop_name = process.env.SHOP_NAME

const http = axios.create({
    baseURL: `https://${shop_name}.myshopify.com/admin/`,
    auth: {
        username: apiKey,
        password: apiSecret
    }
})

function get_products(query) {
    console.log(query)
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

app.get('/api/products', (req, res) => {

    axios.all([get_products(req.query), get_product_count()])
        .then(axios.spread((products_res, count_res) => {
            let data = {
                products: products_res.data.products,
                count: count_res.data.count
            }
            res.status(200).json(data)
        })).catch(err => res.status(500).send(err))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

