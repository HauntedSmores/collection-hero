import express from 'express'
import axios from 'axios'
import {
    http,
    es_client
} from '../utils'

const router = express.Router()

router.get('/', (req, res) => {
    let get_all_products = http.get('products/count.json').then(count_res => {
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

        return Promise.all(requests).then(responses => {
            return [].concat(...responses.map(item => {
                return [].concat(...item.data.products.map(item => [
                    { index: { _index: 'products', _type: 'product', _id: item.id } },
                    item
                ]))
            }))
            
        }).catch(err => console.error(err))
        
    }).catch(err => console.error(err))
    
    let get_collections = [http.get('custom_collections.json'), http.get('smart_collections.json')]
    
    let get_collection_products = Promise.all(get_collections).then(collection_sets => {
        let collections = [].concat(...collection_sets.map(col => {
            return col.data.smart_collections || col.data.custom_collections
        }))
        
        let collection_updates = [].concat(...collections.map(collection => [
            { index: { _index: 'collections', _type: 'collection', _id: collection.id } },
            collection
        ]))
        
        collections = collections.map(collection => {
            return http.get('products/count.json', {
                params: { collection_id: collection.id }
            }).then(collection_count_res => {
                let requests = []
                let pages = Math.ceil(collection_count_res.data.count / 250)

                if (pages > 0) {
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
                    
                    return Promise.all(requests).then(responses => {
                        return [].concat(...responses.map(item => {
                            return [].concat(...item.data.products.map(item => [
                                { index: { _index: `collection_${collection.handle}`, _type: 'product', _id: item.id } },
                                item
                            ]))
                        }))
                        
                    }).catch(err => console.error(err))
                } else {
                    return []
                }
            })
            
        })
        
        return Promise.all(collections).then(values => {
            return collection_updates.concat(...values.filter(item => item.length))
        })
        
    }).catch(err => console.error(err))
    
    Promise.all([get_all_products, get_collection_products]).then(values => {
        es_client.bulk({
            body: [].concat(...values)
        }, (err, index_response) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(index_response)
            }
        })
    })


})

export default router