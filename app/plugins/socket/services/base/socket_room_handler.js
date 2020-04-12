export default class SocketRoomHandler {
  constructor(id, io, socket) {
    this.id = id;
    this.io = io;
    this.socket = socket;

    this.joinRoom();
  }

  perform() { }

  joinRoom() {
    this.socket.join(this.id, () => {
      console.log('[+] Room joined:', Object.keys(this.socket.rooms));
    });

    this.socket.on('disconnect', () => {
      this.socket.leave(this.id, () => {
        console.log('[-] Room leaved:', this.socket.id);
      });
    });
  }

  on(event, callback = function () { }) {
    this.socket.on(this.eventName(event), callback);
  }

  emit(event, data) {
    this.io.to(this.id).emit(this.eventName(event), data);
  }

  eventName(event) {
    return `${this.id}/${event}`;
  }
}
