import axios from 'axios'
import elasticsearch from 'elasticsearch'

const apiKey = process.env.SHOPIFY_API_KEY
const apiSecret = process.env.SHOPIFY_API_SECRET

export const shop_name = process.env.SHOP_NAME

export const es_client = new elasticsearch.Client({
    host: 'localhost:9200',
    // log: 'trace'
});

export const http = axios.create({
    baseURL: `https://${shop_name}.myshopify.com/admin/`,
    auth: {
        username: apiKey,
        password: apiSecret
    }
})