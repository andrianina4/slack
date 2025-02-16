import { IUser, TypeModifyUser } from "@/interfaces/entity";
import { IResponseCheckSessions, IResponseLogin } from "@/interfaces/responses";

export async function getCheckSession() {
  const response = await fetch("http://localhost/api/auth/check-session");
  return (await response.json()) as IResponseCheckSessions;
}

export async function modifyUser(body: TypeModifyUser) {
  const response = await fetch("http://localhost/api/user/modifyUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Spécifie que tu envoies du JSON
    },
    body: JSON.stringify(body), // Convertit l'objet en JSON
  });

  return (await response.json()) as IUser;
}

export async function getAllUser() {
  const response = await fetch("http://localhost/api/user/getAllUser");
  return (await response.json()) as IUser[];
}

export async function getUser(userId: number) {
  const response = await fetch(`http://localhost/api/user/getUser/${userId}`);
  return (await response.json()) as IUser;
}

export async function login(body: { email: string; password: string }) {
  const response = await fetch("http://localhost/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Spécifie que tu envoies du JSON
    },
    body: JSON.stringify(body), // Convertit l'objet en JSON
  });

  return (await response.json()) as IUser | IResponseLogin;
}
