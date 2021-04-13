(function () {
	let socket = new WebSocket('ws://localhost:3002');

	socket.addEventListener('open', function () {
		console.log('连接成功');
		socket.send('收到我消息没')
	})

	socket.addEventListener('close', function () {
		console.log('断开连接');
	})

	socket.addEventListener('error', function (err) {
		console.log('连接错误', err)
	})
                                                 
})()