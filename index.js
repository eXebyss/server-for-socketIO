const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})
const config = require('config')
const PORT = process.env.PORT || config.get('serverPort')

app.get('/', (req, res) => {
	res.send(`<h1>Hello World!</h1>`)
})

io.on('connection', socket => {
	socket.on('chat-message', msg => {
		io.emit('chat-message', msg)
	})
})

http.listen(PORT, () => {
	console.log(`Socket.IO server running app at http://localhost:${PORT}`)
})
