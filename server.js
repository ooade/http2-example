const express = require('express')
const getCert = require('devcert-san').default
const fs = require('fs')
const spdy = require('spdy')

const app = express()

app.get('*', (req, res) => res.json({ ok: 'yeah' }))

async function generateCert(cb) {
	let { key, cert } = await getCert('my-app', { installCertutil: true })

	fs.writeFileSync('server.key', key)
	fs.writeFileSync('server.crt', cert)

	cb()
}

generateCert(() => {
	const options = {
		key: fs.readFileSync(__dirname + '/server.key'),
		cert: fs.readFileSync(__dirname + '/server.crt')
	}

	spdy
		.createServer(options, app)
		.listen(8080, () => console.log('http2 server is listening on port 8080'))
})
