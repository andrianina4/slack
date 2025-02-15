import { IUser, TypeModifyUser } from "@/interfaces/entity";
import { IResponseCheckSessions } from "@/interfaces/responses";

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
