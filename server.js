const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const peer = ExpressPeerServer(server, { debug: true });

let activeRooms = {}; 

app.use('/peerjs', peer);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz (Página de inicio de sesión)
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta al menú de usuarios
app.get('/menu', (req, res) => {
  res.render('menu', { activeRooms: Object.keys(activeRooms) }); 
});

// Ruta al menú de veterinarias
app.get('/menuVeter', (req, res) => {
  res.render('menuVeter', { activeRooms: Object.keys(activeRooms) }); 
});

// Ruta para iniciar una videollamada
app.get('/videocall', (req, res) => {
  const roomId = uuidv4(); 
  activeRooms[roomId] = true; 
  res.redirect(`/videocall/${roomId}`);
});

// Ruta para renderizar la vista de videollamada
app.get('/videocall/:room', (req, res) => {
  const roomId = req.params.room;
  if (!activeRooms[roomId]) {
    return res.redirect('/menu'); 
  }
  res.render('videocall', { RoomId: roomId });
});

// Ruta para obtener las salas activas
app.get('/active-rooms', (req, res) => {
  res.json(Object.keys(activeRooms));
});

io.on('connection', (socket) => {
  socket.on('newUser', (id, room) => {
    socket.join(room);
    io.to(room).emit('userJoined', id);

    socket.on('disconnect', () => {
      io.to(room).emit('userDisconnect', id);

      // Verificar si la sala está vacía
      const usersInRoom = io.sockets.adapter.rooms.get(room) || new Set();
      if (usersInRoom.size === 0) {
        delete activeRooms[room]; 
      }
    });
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log('Server running on port : ' + port);
});
