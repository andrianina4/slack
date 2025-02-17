import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IUser } from "@/interfaces/entity";
import { getInitialName } from "@/lib";

type PropsAvatarCustom = {
  user?: IUser | null;
};

export default function AvatarCustom({ user }: PropsAvatarCustom) {
  return (
    <Avatar className=" text-white">
      <AvatarFallback className="bg-[#424040]">
        {getInitialName(user?.firstname)}
        {getInitialName(user?.lastname)}
      </AvatarFallback>
    </Avatar>
  );
}
