import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'
import elasticsearch from 'elasticsearch'

dotenv.config()

const app = express()
const port = 5000
const apiKey = process.env.SHOPIFY_API_KEY
const apiSecret = process.env.SHOPIFY_API_SECRET
const shop_name = process.env.SHOP_NAME
const es_client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

const http = axios.create({
    baseURL: `https://${shop_name}.myshopify.com/admin/`,
    auth: {
        username: apiKey,
        password: apiSecret
    }
})

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

app.get('/api/sync', (req, res) => {
    http.get('products/count.json').then(count_res => {
        let pages = Math.ceil(count_res.data.count / 250)

        let requests = []
        for (let i = 1; i <= pages; i++) {
            let request = http.get('products.json', {
                params: {
                    limit: 250,
                    page: i
                }
            }).catch(err => console.log(err))
            requests.push(request)
        }
    
        Promise.all(requests).then(responses => {
            let products = []
    
            responses.forEach(item => {
                products = products.concat(item.data.products)
            })

            products = [].concat(...products.map(item => [
                { index: { _index: 'products', _type: 'product', _id: item.id } },
                item
            ]))

            es_client.bulk({
                body: products
            }, (err, index_response) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).send(index_response)
                }
            })
            
        })

    })
})

app.get('/api/mapping', (req, res) => {
    es_client.indices.getMapping({index: 'products'}).then(body => {
        res.status(200).send(body)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

