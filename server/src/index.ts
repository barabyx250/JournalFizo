import { ChatServer } from './ChatServer';
import "reflect-metadata";

let app = new ChatServer().getApp();
export { app };