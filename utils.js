const crypto = require('crypto');

const utils = {
	/*
	*根据客户端的key加密生成返回给客户端的确认key
	*{guid : String} 全局唯一标识
	*{key : String} 客户端请求头的key
	*/
	createSocketKey (guid, key) {
		let hash = crypto.createHash('sha1');

		hash.update(`${key}${guid}`);

		return hash.digest('base64');
	},

	/*
	*创建node中websocket握手响应头
	*{newKey : String} 全局唯一标识+key加密后的新的key
	*/ 
	createReponseHead (newKey) {
		// let	newKey = this.createSocketKey(guid, key);
		// return `HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-Websocket-Accept: ${newKey}\r\n\r\n`
		let res = [
			'HTTP/1.1 101 Switching Protocols',
			'Upgrade: websocket',
			'Connection: Upgrade',
			`Sec-Websocket-Accept: ${newKey}`
		].concat('','').join('\r\n')

		return res;
	}
}

module.exports = utils;