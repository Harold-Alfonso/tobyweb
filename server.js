const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 4000
const { v4: uuidv4 } = require('uuid')
const { ExpressPeerServer } = require('peer')
const peer = ExpressPeerServer(server, {
  debug: true,
})

app.use('/peerjs', peer)
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const users = {
  Harold: '123456',
}

// Ruta raíz (Página de inicio de sesión)
app.get('/', (req, res) => {
  res.render('index')
})

// Manejo de la autenticación básica
app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (users[username] && users[username] === password) {
    return res.redirect('/menu')
  } else {
    return res.redirect('/')
  }
})

// Ruta al menú principal
app.get('/menu', (req, res) => {
  res.render('menu')
})

// Ruta para iniciar una videollamada
app.get('/videocall', (req, res) => {
  const roomId = uuidv4() // Genera un ID único para la sala
  res.redirect(`/videocall/${roomId}`)
})

// Ruta para renderizar la vista de videollamada
app.get('/videocall/:room', (req, res) => {
  res.render('videocall', { RoomId: req.params.room })
})

io.on('connection', (socket) => {
  socket.on('newUser', (id, room) => {
    socket.join(room)
    io.to(room).emit('userJoined', id)
    socket.on('disconnect', () => {
      io.to(room).emit('userDisconnect', id)
    })
  })
})

server.listen(port, '0.0.0.0', () => {
  console.log('Server running on port : ' + port)
})
