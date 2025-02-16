import { getUserInChannel } from "@/api/channel";
import { useQuery } from "@tanstack/react-query";

type PropsChannelId = {
  channelId: number;
};
export default function ListUser({ channelId }: PropsChannelId) {
  const { data } = useQuery({
    queryKey: ["getUserInChannel"],
    queryFn: () => {
      return getUserInChannel(channelId);
    },
  });
  return <div>ListUser {data?.length}</div>;
}
