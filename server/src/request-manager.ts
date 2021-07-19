import e = require("cors");
import {
  RequestType,
  RequestMessage,
  ResponseMessage,
  ResponseCode,
} from "../../client/src/types/requests";
export class RequestManager {
  public static m_sessionSocket: Map<string, string> = new Map<
    string,
    string
  >();

  public static on(socket: SocketIO.Socket, io: SocketIO.Server) {
    socket.on(RequestType.USERLOGIN, async (m: any) => {
      try {
        let dataArr = m;
        if (dataArr[0] === "admin" && dataArr[1] === "Bius2019") {
          m = "admin";
          socket.emit(RequestType.USERLOGIN, m);
        } else if (dataArr[0] === "свінчук" && dataArr[1] === "свінчук") {
          m = "свінчук";
          socket.emit(RequestType.USERLOGIN, m);
        } else {
          m = false;
          socket.emit(RequestType.USERLOGIN, m);
        }
      } catch (e) {
        socket.emit(RequestType.ERROR, "Не валідні данні");
      }
    });
  }
}
