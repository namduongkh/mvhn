export default class SocketClientRoomHandler {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
  }

  perform() {
    this.socket.emit('join', this.id, () => {
      console.log('Joined', this.id);
    });
  }

  on(event, callback = function () { }) {
    console.log('On', `${this.id}/${event}`);
    this.socket.on(`${this.id}/${event}`, callback);
  }

  emit(event, data, callback = function () { }) {
    console.log('Emit', `${this.id}/${event}`);
    this.socket.emit(`${this.id}/${event}`, data, callback);
  }
}
