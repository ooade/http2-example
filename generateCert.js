const fs = require('fs')
const getCert = require('devcert-san').default

async function generateCert() {
	let { cert, key } = await getCert('apollo-playground', {
		installCertutil: true
	})

	fs.writeFileSync('server.key', key)
	fs.writeFileSync('server.crt', cert)
}

generateCert()
