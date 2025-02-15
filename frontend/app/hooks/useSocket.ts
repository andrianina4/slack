import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "ws://localhost";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket");

      //   socketInstance.emit(
      //     "create product",
      //     { name: "product 1" },
      //     (response) => {
      //       if (response.status === "error") {
      //         console.log(response.error);
      //       }
      //     }
      //   );
    });

    socketInstance.on("connect_error", () => {
      console.log("Impossible to establish the socket.io connection");
    });

    socketInstance.on("refresh products", () => {
      console.log("refresh products!");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
