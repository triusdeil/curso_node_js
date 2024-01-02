const http = require('node:http');

const server = http.createServer((req, res) => {
    console.log('req received')
    res.end('Hola mundo')
})

server.listen(0, () => {
    console.log(`${server.address().port}`)
})