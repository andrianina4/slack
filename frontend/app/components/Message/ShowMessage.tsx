import { IUser } from "@/interfaces/entity";
import { format, formatDistance, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import AvatarCustom from "../AvatarCustom";
type PropsShowMessage = {
  datas: {
    content: string;
    sender: IUser | null;
    date: string;
  };
};

export default function ShowMessage({ datas }: PropsShowMessage) {
  const { content, date, sender } = datas;

  const dateParsed = date ? new Date(date) : new Date();
  const duration = isSameDay(new Date(), dateParsed)
    ? formatDistance(new Date(), dateParsed, {
        locale: fr,
      })
    : format(dateParsed, "dd-mm-yyyy");

  return (
    <div className="mt-2.5 ml-1.5 flex gap-2.5 ">
      <AvatarCustom user={sender} />
      <div>
        <p className="font-semibold">
          {sender?.firstname} {sender?.lastname}{" "}
          <span className="font-normal text-sm text-gray-500">{duration}</span>
        </p>
        <p>{content}</p>
      </div>
    </div>
  );
}
