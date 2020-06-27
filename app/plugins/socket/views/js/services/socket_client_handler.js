import SocketClientRoomHandler from "./socket_client_room_handler";

export default class SocketClientHandler {
  constructor() {
    this.socket = io();
    this.on = this.socket.on;
    this.emit = this.socket.emit;

    this.onEventLog();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  join(id, callback = function () { }) {
    let handler = new SocketClientRoomHandler(id, this.socket);
    handler.perform();
    callback(handler);
  }

  onEventLog() {
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
    this.socket.on('error', (error) => {
      console.log('Socket error:', error);
    });
  }
}
