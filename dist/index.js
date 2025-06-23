"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
// creates a Websocket server that listens on port 8080
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = new Map();
wss.on("connection", (socket) => {
    console.log("connected to the websocket server");
    socket.on("message", (message) => {
        var _a;
        // since websocket servers can only accept strings and binary as message body.
        // @ts-ignore
        const jsonMessage = JSON.parse(message);
        if (jsonMessage.type === "join") {
            socket.roomId = jsonMessage.payload.roomID;
            console.log("The room id is: " + socket.roomId);
            if (!allSockets.has(socket.roomId)) {
                allSockets.set(socket.roomId, [socket]);
            }
            else {
                (_a = allSockets.get(socket.roomId)) === null || _a === void 0 ? void 0 : _a.push(socket);
            }
        }
        if (jsonMessage.type === "chat") {
            if (!socket.roomId) {
                console.log("Socket has no roomId, user hasn't joined a room yet");
                return;
            }
            let socketsArray = allSockets.get(socket.roomId);
            console.log("allSockets Map " + allSockets);
            console.log("socketsArray " + socketsArray);
            socketsArray === null || socketsArray === void 0 ? void 0 : socketsArray.forEach(s => {
                s.send(jsonMessage.payload.message);
            });
        }
    });
});
