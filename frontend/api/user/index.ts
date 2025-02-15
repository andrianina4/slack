import { IResponseCheckSessions } from "@/interfaces/responses";

export async function getCheckSession() {
  const response = await fetch("http://localhost/api/auth/check-session");

  return (await response.json()) as IResponseCheckSessions;
}
