import { WebSocketServer , WebSocket } from "ws";

// creates a Websocket server that listens on port 8080
const wss = new WebSocketServer({ port: 8080 });

// jitne bhi clients connect krre hain, unke socket connections ka array
let sockets : WebSocket[] = [];

wss.on("connection", (socket) => {

     console.log("connected to the websocket server");
     sockets.push(socket);

     socket.on("message" , (message) => {
        
        //broadcasts the message sent by one client to all the clients connected to the Websocket server
        sockets.forEach( s => {
            s.send("Message sent from the server : " + message.toString());
        })
        
     });

});