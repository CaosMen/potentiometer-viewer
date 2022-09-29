const fs = require('fs');
const http = require('http');
const socketIO = require('socket.io');
const SerialPort = require('serialport');

const index = fs.readFileSync('views/index.html');

const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
  delimiter: '\n'
});

/* Alterar para a porta que o Arduino está conectado */
const port = new SerialPort('COM7', { 
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

port.pipe(parser);

const app = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
});

const io = socketIO.listen(app);

io.on('connection', function(socket) {
  console.log('Node is listening to port');
});

parser.on('data', function(data) {
  console.log('Received data from port: ' + data);
  
  io.emit('data', JSON.parse(data));
});

app.listen(3000);