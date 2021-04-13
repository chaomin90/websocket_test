const net = require('net');
const guid = require('./_default.js').guid;
const utils = require('./utils.js');

const netServer = net.createServer(function (socket) {
	socket.once('data', (buffer) => {
		let httpHeadObj = formatBuffer(buffer),
			isSocket = httpHeadObj.upgrade == 'websocket',
			isVesion = httpHeadObj['sec-websocket-version'] == 13;

		if (!isVesion) {
			console.log('vesion is not allow');
			socket.end();
		}

		if (!isSocket) {
			console.log('not socket');
			socket.end();
		}

		let newKey = utils.createSocketKey(guid,httpHeadObj['sec-websocket-key']),
			header = utils.createReponseHead(newKey);
		
		socket.write(header);
		console.log(header);
	})
})

netServer.listen(3002, () => {
	console.log('net server start')
})

function formatBuffer (buffer) {
	let httpHeadText = buffer.toString(),
		httpHeadObj = {};

	httpHeadArr = httpHeadText.replace(/\r\n/g, '@@').split('@@');
	httpHeadArr.shift();
	httpHeadArr.forEach((item) => {
		let isExist = item.indexOf(':') !== -1
		if (isExist) {
			let arr = item.split(':')
			httpHeadObj[arr[0].trim().toLowerCase()] = arr[1].trim()
		}
		
	})
	return httpHeadObj
}

