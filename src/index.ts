import { WebSocketServer , WebSocket } from "ws";

// creates a Websocket server that listens on port 8080
const wss = new WebSocketServer({ port: 8080 });

interface RoomWebSocket extends WebSocket {
    roomId: string;
}

let allSockets : Map<String, RoomWebSocket[]> = new Map();

wss.on("connection", (socket : RoomWebSocket) => {

     console.log("connected to the websocket server");
     
     socket.on("message", (message) => {
        // since websocket servers can only accept strings and binary as message body.
        // @ts-ignore
        const jsonMessage = JSON.parse(message); 
        
        if(jsonMessage.type === "join"){
             socket.roomId = jsonMessage.payload.roomID;
             console.log("The room id is: " + socket.roomId);

             if(!allSockets.has(socket.roomId)){
                 allSockets.set(socket.roomId, [socket]);
             }
             else{
                allSockets.get(socket.roomId)?.push(socket);
             }   
        }
        
        if(jsonMessage.type === "chat"){

            if (!socket.roomId) {
                console.log("Socket has no roomId, user hasn't joined a room yet");
                return;
            }
              let socketsArray = allSockets.get(socket.roomId);
              console.log("allSockets Map " + allSockets);
              console.log("socketsArray " + socketsArray);
              socketsArray?.forEach( s => {
                  s.send(jsonMessage.payload.message);
              })
        }
          
     })

});