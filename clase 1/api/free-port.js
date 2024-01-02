const net = require('node:net')

function findAvaiblePort(desiredPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer()
        server.listen(desiredPort, () => {
            const port  = server.address().port
            server.close(() => {
                resolve(port)
            })
        })
        resolve(0)
    })
}