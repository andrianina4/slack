import { getCheckSession } from "@/api/user";
import { IUser } from "@/interfaces/entity";
import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

export const useAuth = () => {
  const { data } = useQuery({
    queryKey: ["getCheckSession"],
    queryFn: getCheckSession,
  });

  // const [userConnected, setUserConnected] = useState<IUser | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     const user = await getCheckSession();
  //     if (user.status === 200) setUserConnected(user.user as IUser);
  //   })();
  //   return () => {};
  // }, []);

  if (data) return data.user as IUser;
  else return null;
};
