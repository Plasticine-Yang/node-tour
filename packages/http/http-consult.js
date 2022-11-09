const http = require('http')
const url = require('url')

const responseData = {
  id: 'plasticine',
  name: '草帽Plasticine',
  registerDate: '2022年11月9日',
}

const toHTML = data => {
  return `
    <ul>
      <li><span>账号：</span><span>${data.ID}</span></li>
      <li><span>昵称：</span><span>${data.Name}</span></li>
      <li><span>注册时间：</span><span>${data.RegisterDate}</span></li>
    </ul>
  `
}

const server = http.createServer((req, res) => {
  const { path } = url.parse(`http://${req.headers.host}${req.url}`)

  switch (path) {
    case '/':
      const accept = req.headers.accept

      if (accept.includes('application/json')) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(responseData))
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(toHTML(responseData))
      }
      break

    default:
      res.writeHead(404, { 'Content-Type': 'text/html' })
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
