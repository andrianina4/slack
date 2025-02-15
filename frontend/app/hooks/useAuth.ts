import { getCheckSession } from "@/api/user";
import { IUser } from "@/interfaces/entity";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [userConnected, setUserConnected] = useState<IUser | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getCheckSession();
      if (user.status === 200) setUserConnected(user.user as IUser);
    })();
    return () => {};
  }, []);

  return userConnected;
};
