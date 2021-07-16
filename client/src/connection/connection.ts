import * as socketIo from "socket.io-client";
import {
  RequestType,
} from "../types/requests";

export default class ConnectionManager {
  public static registerResponseHandler(
    MESSAGE: any,
    arg1: (data: any) => void
  ) {
    ConnectionManager.getInstance().m_socket.on(MESSAGE, arg1);
  }

  private static instance: ConnectionManager;
  private m_socket: SocketIOClient.Socket;
  private m_registeredResponseHandler: Array<RequestType>;

  private constructor(socket: SocketIOClient.Socket) {
    this.m_socket = socket;
    this.m_registeredResponseHandler = new Array<RequestType>();
  }

  public static getInstance(): ConnectionManager {
    console.log();
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager(
        socketIo.connect("http://localhost:8080/")
      );
      ConnectionManager.instance.m_socket.on("connect_error", (reason: any) => {
        console.log("error", reason);
      });
    }
    return ConnectionManager.instance;
  }

  public emit(requestType: RequestType, data: any) {
    // if (this.m_socket.connected || stackToQueue) {
    this.m_socket.emit(requestType, data);
    // }
  }
}
