"use strict";

var _express = _interopRequireDefault(require("express"));

var _nonce = _interopRequireDefault(require("nonce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = 5000;
var apiKey = process.env.SHOPIFY_API_KEY;
var apiSecret = process.env.SHOPIFY_API_SECRET;
var scopes = 'read_products'; // const forwardingAddress = process.env.PUBLIC_URL

app.get('/', function (req, res) {
  return res.send('Hello World!');
});
app.get('/shopify', function (req, res) {
  var shop = req.query.shop;

  if (shop) {
    var state = (0, _nonce.default)();
    var redirectUri = forwardingAddress + '/shopify/callback';
    var installUrl = 'https://' + shop + '/admin/oauth/authorize?client_id=' + apiKey + '&scope=' + scopes + '&state=' + state + '&redirect_uri=' + redirectUri;
    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
});
app.listen(port, function () {
  return console.log("Example app listening on port ".concat(port, "!"));
});
