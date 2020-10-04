import SocketRoomHandler from "../base/socket_room_handler";

export default class StrangerHandler extends SocketRoomHandler {

  perform() {
    this.socket.on('disconnect', () => {
      this.emit('exit', null);
    });
    this.on('exit', (data) => {
      this.emit('exit', data);
    });
  }
}
