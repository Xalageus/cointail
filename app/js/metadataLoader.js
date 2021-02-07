/* global fs:true */

fs.readFile('./app/assets/metadata.json', 'utf8', (err, data) => {
  if (err) {
    console.log(`Error reading metadata file: ${err}`)
  }

  const metadata = JSON.parse(data)

  document.getElementById('ver').innerHTML += metadata.nodeBuildVer
})
