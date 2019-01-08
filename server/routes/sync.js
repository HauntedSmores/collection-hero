import express from 'express'
import axios from 'axios'
import {
    http,
    es_client
} from '../utils'

const router = express.Router()

router.get('/', (req, res) => {
    // http.get('products/count.json').then(count_res => {
    //     let pages = Math.ceil(count_res.data.count / 250)

    //     let requests = []
    //     for (let i = 1; i <= pages; i++) {
    //         let request = http.get('products.json', {
    //             params: {
    //                 limit: 250,
    //                 page: i
    //             }
    //         }).catch(err => console.log(err))
    //         requests.push(request)
    //     }

    //     Promise.all(requests).then(responses => {
    //         //   console.log(...responses)
    //         let products = [].concat(...responses.map(item => {
    //             return [].concat(...item.data.products.map(item => [
    //                 { index: { _index: 'products', _type: 'product', _id: item.id } },
    //                 item
    //             ]))
    //         }))

    //         es_client.bulk({
    //             body: products
    //         }, (err, index_response) => {
    //             if (err) {
    //                 res.status(500).send(err)
    //             } else {
    //                 res.status(200).send(index_response)
    //             }
    //         })



    //     }).catch(err => console.error(err))

    // }).catch(err => console.error(err))

    let get_collections = [http.get('custom_collections.json'), http.get('smart_collections.json')]

    Promise.all(get_collections).then(collection_sets => {
        let collections = [].concat(...collection_sets.map(col => {
            return col.data.smart_collections || col.data.custom_collections
        }))

        // res.status(200).send(collections)

        // console.log(collections)
        let requests = []

        collections.forEach(collection => {
            http.get('products/count.json', {
                params: { collection_id: collection.id }
            }).then(collection_count_res => {

                let pages = Math.ceil(collection_count_res.data.count / 250)
                for (let i = 1; i <= pages; i++) {
                    let request = http.get('products.json', {
                        params: {
                            collection_id: collection.id,
                            limit: 250,
                            page: i
                        }
                    }).catch(err => console.log(err))
                    requests.push(request)
                }

                console.log(requests)
                Promise.all(requests).then(responses => {
                    let products = [].concat(...responses.map(item => {
                        return [].concat(...item.data.products.map(item => [
                            { index: { _index: `collections/${collection.handle}`, _type: 'product', _id: item.id } },
                            item
                        ]))
                    }))
    
                    console.log(products)
    
                    res.status(200).send(products)
    
                    // es_client.bulk({
                    //     body: products
                    // }, (err, index_response) => {
                    //     if (err) {
                    //         res.status(500).send(err)
                    //     } else {
                    //         res.status(200).send(index_response)
                    //     }
                    // })
    
                }).catch(err => console.error(err))
            })

        })
    }).catch(err => console.error(err))
})

export default router