const net = require('net')

/**
 * @description 生成 HTTP Response Body
 * @param {string} data HTTP Response Data
 * @param {number} status HTTP Response Status Code
 * @param {string} desc HTTP Response Description
 */
const generateResponseBody = (data, status = 200, desc = 'OK') => {
  const headersToString = headers => {
    const headersStringArr = []
    for (const [key, value] of Object.entries(headers)) {
      headersStringArr.push(`${key}: ${value}`)
    }

    return headersStringArr
  }

  const headers = {
    Connection: 'keep-alive',
    Date: new Date(),
    'Content-Type': 'text/html',
    'Content-Length': data.length,
  }

  const responseBodyArr = [
    `HTTP/1.1 ${status} ${desc}`,
    ...headersToString(headers),
    '',
    data,
  ]

  return responseBodyArr.join('\n')
}

const server = net.createServer(socket => {
  socket.on('data', data => {
    const matched = data.toString('utf-8').match(/^GET ([/\w]+) HTTP/)
    if (matched) {
      const path = matched[1]
      if (path === '/') {
        socket.write(generateResponseBody(`<h1>Hello World</h1>`))
      } else {
        socket.write(
          generateResponseBody('<h1>Not Found</h1>', 404, 'NOT FOUND'),
        )
      }
    }

    console.log(`${'='.repeat(50)} DATA ${'='.repeat(50)}\n\n${data}`)
  })

  socket.on('close', () => {
    console.log('connection closed.')
  })
})

server.listen({ host: '0.0.0.0', port: 8080 }, () => {
  console.log('opend server on:', server.address())
})
