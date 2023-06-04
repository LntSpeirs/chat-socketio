import "./App.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:4000");

function App() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      from: "usuario 1",
      body: "Mensaje de prueba",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", mensaje);
    const nuevoMensaje = {
      body: mensaje,
      from: "Yo",
    };
    setMensajes([...mensajes, nuevoMensaje]);
    setMensaje("");
  };

  useEffect(() => {
    const mensajeRecibido = (mensaje) => {
      console.log(mensaje);
      setMensajes([...mensajes, mensaje]);
    };
    //mantente a la escucha de mensajes entrantes
    socket.on("mensaje", mensajeRecibido);

    return () => {
      //Desuscribirse cuando el componente ya no esta
      socket.off("mensaje", mensajeRecibido);
    };
  }, [mensajes]);
  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">CHAT REACT</h1>
        <input
          type="text"
          onChange={(e) => setMensaje(e.target.value)}
          value={mensaje}
          className="border-2 border-zinc-500 p-2 text-black w-full"
        />
        <ul className="h-80 overflow-y-auto">
          {mensajes.map((mensaje, index) => (
            <li key={index} className={`my-2 p-2 text-sm rounded-sm table ${mensaje.from === "Yo" ? "bg-sky-700 ml-auto" : "bg-black"}`}>
              <p>
                {mensaje.from}: {mensaje.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
