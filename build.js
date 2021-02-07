const fs = require('fs')
const fetch = require('isomorphic-fetch')
const sortBy = require('lodash.sortby')

const endpoint = 'https://www.cryptocompare.com/api/data/coinlist/'

function createMeta () {
  // Remove 'v' from version number
  const meta = { nodeBuildVer: process.version.substring(1) }
  fs.writeFileSync('./app/assets/metadata.json', JSON.stringify(meta, null, 2))
  console.log('metadata.json saved')
}

function checkDir (dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

fetch(endpoint)
  .then(response => response.json())
  .then(json => {
    const sorted = sortBy(json.Data, o => o.CoinName)

    const symbols = {}

    sorted.forEach(currency => {
      const { Name, CoinName } = currency
      symbols[Name] = CoinName
    })

    // Make sure the assets folder exists
    checkDir('./app/assets')

    fs.writeFileSync('./app/assets/cryptocurrencies.json', JSON.stringify(symbols, null, 2))

    console.log('cryptocurrencies.json saved')

    createMeta()
  })
