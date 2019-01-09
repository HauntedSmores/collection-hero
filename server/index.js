import express from 'express'
import body_parser from 'body-parser'
import user_config from './routes/user-config'
import sync from './routes/sync'
import products from './routes/products'
import collection from './routes/collection'
import { es_client } from './utils'


const app = express()
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

const port = 5000

app.use('/api/sync', sync)

app.use('/api/products', products)

app.use('/api/user-config', user_config)
app.use('/api/collection', collection)

app.get('/api/filter', (req, res) => {
    es_client.search({
        index: 'products',
        body: {
            query: {
                bool: {
                    filter: { term: { 'vendor': 'adidas' } }
                }
            }
        }
    }).then(data => {
        console.log(data)
        res.status(200).send(data)
    })
})

app.post('/api/hook', (req, res) => {
    console.log(req.body)
    res.status(200).send('OK')
})


app.get('/api/mapping', (req, res) => {
    es_client.indices.getMapping({index: 'products'}).then(body => {
        res.status(200).send(body.products.mappings)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

