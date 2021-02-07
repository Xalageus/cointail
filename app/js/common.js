/* global fs:true */

const cc = require('cryptocompare')
const settings = require('electron-settings')

// Load built-in cryptocurrencies list
function loadBCC () {
  fs.readFile('./app/assets/cryptocurrencies.json', 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading cryptocurrencies file: ${err}`)
    }

    const ccurrencies = JSON.parse(data)
    return ccurrencies
  })
}

const currencies = loadBCC()

const testbtc = cc.price('BTC', ['USD'])
  .then(prices => {
    document.getElementById('btc-price').innerHTML += prices.USD
  })
  .catch(console.error)
