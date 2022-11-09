const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const { path } = url.parse(`http://${req.headers.host}${req.url}`)

  switch (path) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text-html' })
      res.end('<h1>Hello World</h1>')
      break

    default:
      res.writeHead(404, { 'Content-Type': 'text-html' })
      res.end('<h1>Not Found</h1>')
      break
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(8080, () => {
  console.log('opened server on: ', server.address())
})
