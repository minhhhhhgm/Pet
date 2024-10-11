import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://10.22.20.17:4000/'; 
const socket = io(SOCKET_SERVER_URL);

console.log("run");

socket.on('connection', () => {
  console.log('Connected to WebSocket server', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

export default socket;