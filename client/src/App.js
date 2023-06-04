import "./App.css";
import { io } from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhost:4000");

function App() {
  const [mensaje, setMensaje] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", mensaje);
    console.log(mensaje);
    setMensaje("");
  };
  return (
    <div className="App">
      <h1>CHAT</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMensaje(e.target.value)} />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default App;
