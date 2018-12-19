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

app.get('/api/shop', (req, res, shopify) => {
    http.get('products.json').then(data => {
        console.log(data);
        res.status(200).send('Success');
    }).catch(err => console.error(err))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

