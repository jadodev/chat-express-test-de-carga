# chat-express-test-de-carga

Esto incluye conexión, registro de usuario y envío/recepción de mensajes.

## 🧑‍💻 Instrucciones para conectarse al WebSocket de chat desde React
### ✅ Requisitos previos

Instalar socket.io-client:
```bash
npm install socket.io-client
```

🔌 Paso 1: Conectarse al WebSocket
En algún archivo como socket.js o socket.ts:

```textplain
// src/socket.js
import { io } from 'socket.io-client';

// Asegurate que esta URL coincida con donde corre el backend
const socket = io("http://localhost:4000", {
  transports: ["websocket"], // importante porque el backend lo exige
});

export default socket;
```

📝 Paso 2: Registrar al usuario
En el componente React donde se inicia sesión o se ingresa el nombre:

```textplain
import { useEffect } from 'react';
import socket from './socket';

function Login() {
  useEffect(() => {
    socket.emit('register user', { name: 'Juanito' }, (response) => {
      if (response.status === 'ok') {
        console.log('Usuario registrado correctamente');
      } else {
        console.error('Error al registrar usuario');
      }
    });
  }, []);

  return <div>Conectado al chat</div>;
}
```

💬 Paso 3: Enviar un mensaje
```textplain
function sendMessage(text) {
  socket.emit('chat message', { text }, (response) => {
    if (response.status === 'ok') {
      console.log('Mensaje enviado');
    } else {
      console.error('Error al enviar mensaje');
    }
  });
}
```
📩 Paso 4: Recibir mensajes
En tu componente de chat:

```textplain
import { useEffect } from 'react';
import socket from './socket';

function Chat() {
  useEffect(() => {
    socket.on('chat message', (message) => {
      console.log('Mensaje recibido:', message);
      // Aquí puedes agregarlo al estado o mostrarlo en pantalla
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  return <div>Chat activo</div>;
}
```
