import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  //Cuando el socket te envie un evento
  socket.on("mensaje", (mensaje) => {
    console.log(mensaje);
    //Envias el mensaje al resto de clientes (excluyendo al que le ha enviado el mensaje)
    socket.broadcast.emit("mensaje", {
      from: socket.id,
      body: mensaje,
    });
    return () => {
      //Desuscribimos de la escucha
      socket.off("mensaje", (mensaje) => console.log("Desuscribir"));
    };
  });
});

server.listen(PORT);
console.log("Escuchando en el puerto ", PORT);
