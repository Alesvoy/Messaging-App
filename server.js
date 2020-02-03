var io = require('socket.io')(3000);

var usuarios = {};

io.on('connection', socket => {
  socket.on('nuevo-usuario', nombre => {
    usuarios[socket.id] = nombre;
    socket.broadcast.emit('usuario-conectado', nombre);
  });
  
  socket.on('send-chat-message', mensaje => {
    socket.broadcast.emit('mensaje-chat', {mensaje: mensaje, nombre: usuarios[socket.id]});
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('usuario-desconectado', usuarios[socket.id]);
    delete usuarios[socket.id];
  });
});