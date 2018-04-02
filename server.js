const express = require('express')
const fs = require('fs')
const spdy = require('spdy')

const app = express()

const port = process.env.PORT || 8080

app.get('*', (req, res) => res.json({ ok: 'yeah' }))

const options = {
	key: fs.readFileSync(__dirname + '/server.key'),
	cert: fs.readFileSync(__dirname + '/server.crt'),
	spdy: {
		protocols: ['h2', 'spdy/3.1', 'http/1.1']
	}
}

spdy
	.createServer(options, app)
	.listen(port, () => console.log('http2 server is listening on port ' + port))
