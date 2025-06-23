"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let sockets = [];
wss.on("connection", (socket) => {
    console.log("connected to the websocket server");
    sockets.push(socket);
    socket.on("message", (message) => {
        sockets.forEach(s => {
            s.send("Message sent from the server : " + message.toString());
        });
    });
});
