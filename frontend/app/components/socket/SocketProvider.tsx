"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost";

type SocketContextProps = Socket | null;

const SocketContext = createContext<SocketContextProps>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"], // Optimisation pour éviter les polling requests
    });

    newSocket.on("connect", () => {
      console.log("Frontend connecté avec ID :", newSocket.id);
      newSocket.emit("joinPrivateChat", { userId: auth?.id });
    });

    newSocket.on("disconnect", () => {
      console.log("Frontend déconnecté");
    });

    setSocket(newSocket);

    return () => {
      // newSocket.disconnect();
      newSocket.off("connect");
      newSocket.off("disconnect");
    };
  }, [auth]);

  const value = useMemo(() => socket, [socket]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
