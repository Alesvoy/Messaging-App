var socket = io('http://localhost:3000');
var messageForm = document.getElementById('send-container');
var messageContainer = document.getElementById('message-container');
var messageInput = document.getElementById('message-input');

var nombre = prompt('Cual es tu nombre?');
agregarMensaje('Bienvenido al chat.');
socket.emit('nuevo-usuario', nombre);

socket.on('mensaje-chat', data => {
  agregarMensaje(`${data.nombre}: ${data.mensaje}`);
});

socket.on('usuario-conectado', nombre => {
  agregarMensaje(`${nombre} conectado`);
});

socket.on('usuario-desconectado', nombre => {
  agregarMensaje(`${nombre} desconectado`);
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  var mensaje = messageInput.value;
  agregarMensaje(`Tu: ${mensaje}`);
  socket.emit('send-chat-message', mensaje);
  messageInput.value = '';
});

function agregarMensaje(mensaje){
  var elementoMensaje = document.createElement('div');
  elementoMensaje.innerText = mensaje;
  messageContainer.append(elementoMensaje);
}