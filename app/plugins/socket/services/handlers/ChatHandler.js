import SocketRoomHandler from "../base/socket_room_handler";

export default class ChatHandler extends SocketRoomHandler {

  perform() {
    this.on('send', (data, callback) => {
      callback();
      this.emit('new', data);
    });
    this.on('typing', (data) => {
      this.emit('typing', data);
    });
  }
}
