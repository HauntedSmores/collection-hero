import dotenv from 'dotenv'
import express from 'express'
import nonce from 'nonce'
import querystring from 'querystring'
import crypto from 'crypto'
import cookie from 'cookie'
import axios from 'axios'
import shopify from 'shopify-node-api'

dotenv.config()

const app = express()
const port = 5000

const apiKey = process.env.SHOPIFY_API_KEY
const apiSecret = process.env.SHOPIFY_API_SECRET
const scopes = 'read_products'
const forwardingAddress = process.env.PUBLIC_URL
const generate_nonce = nonce()
let access = false
let shopify_api = null;

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/shopify', (req, res) => {
  const shop = req.query.shop
  if (shop) {
    const state = generate_nonce()
    const redirectUri = forwardingAddress + '/shopify/callback'
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri

    res.cookie('state', state)
    res.redirect(installUrl)
  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request')
  }
})

function api_shop_callback(req, res) {

}

app.get('/shopify/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query
  const stateCookie = cookie.parse(req.headers.cookie).state

  if (state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified: ' + state + ':' + stateCookie)
  }

  if (shop && hmac && code) {
    // DONE: Validate request is from Shopify
    const map = Object.assign({}, req.query)
    delete map['signature']
    delete map['hmac']
    const message = querystring.stringify(map)
    const providedHmac = Buffer.from(hmac, 'utf-8')
    const generatedHash = Buffer.from(
      crypto
        .createHmac('sha256', apiSecret)
        .update(message)
        .digest('hex'),
        'utf-8'
      )
    let hashEquals = false

    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
    } catch (e) {
      hashEquals = false
    }

    if (!hashEquals) {
      return res.status(400).send('HMAC validation failed')
    }

    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };
    
    axios.post(accessTokenRequestUrl, accessTokenPayload)
      .then(accessTokenResponse => {
        // console.log(accessTokenResponse.data.access_token);

        shopify_api = axios.create({
          baseURL: 'collection-hero.myshopify.com',
          headers: { 'X-Shopify-Access-Token': accessTokenResponse.data.access_token }
        });

        console.log(shopify_api);

        res.redirect('/api/shop')


      })
      .catch(error => {
        console.error(error)
        res.status(500).send(error);
      });
  } else {
    res.status(400).send('Required parameters missing')
  }
})

// let shopify = new shopify({
//   shopName: 'collection-hero',
//   accessToken: 'c37d84a3baa1cf3f29ae711998586d92'
// })

app.get('/api/shop', (req, res, shopify) => {
  if (shopify_api) {
    res.status(200).send('Api is working')
  } else {
    res.status(200).send('Something went wrong')
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

