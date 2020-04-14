import SocketRoomHandler from "./socket_room_handler";

export default class SocketHandler {
  constructor(io) {
    this.io = io;
  }

  async perform() {
    this.io.on('connection', (socket) => {
      console.log('[+] Socket connected:', socket.id);

      socket.on('join', (id) => {
        let handlerClassname = {
          'chat': 'ChatHandler'
        }[id];
        let handlerClass = handlerClassname ? (require(`../handlers/${handlerClassname}`).default || SocketRoomHandler) : SocketRoomHandler;

        new handlerClass(id, this.io, socket).perform();
      });

      socket.on('disconnect', () => {
        console.log('[-] Socket disconnected:', socket.id);
      });
    });
  }
}
