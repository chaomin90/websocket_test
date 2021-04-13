const http = require('http');
const guid = require('./_default.js').guid;
const utils = require('./utils.js');

const server = http.createServer()

server.on('upgrade', (req, socket, upgradeHead) => {
	let reqHeader = req.headers,
		key = reqHeader['sec-websocket-key'],
		isSocket = reqHeader.upgrade == 'websocket',
		isVersion = reqHeader['sec-websocket-version'] == 13;

	if (!isSocket) {
		console.log('no socket');
		socket.end();
	}

	if (!isVersion) {
		console.log('version is not allow');
		socket.end();
	}

	let newKey = utils.createSocketKey(guid, key),
		header = utils.createReponseHead(newKey);

	console.log(header);
	socket.write(header);
	
})

server.listen(3001, () => {
	console.log('http server start')
})