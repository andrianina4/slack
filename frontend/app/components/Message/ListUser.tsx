import { addMembers, getUserInChannel } from "@/api/channel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AvatarCustom from "../AvatarCustom";
import MultiSelect from "../MultiSelect";
import { IUser } from "@/interfaces/entity";
import { getAllUser } from "@/api/user";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type PropsChannelId = {
  channelId: number;
};

const UserComponent = ({ user }: { user: IUser }) => {
  return (
    <div className="mt-5 flex gap-3 items-center cursor-pointer">
      <AvatarCustom user={user} />

      <div className="font-semibold">
        {user.firstname} {user.lastname}
      </div>
    </div>
  );
};

const FormInsertPersonne = ({ channelId }: PropsChannelId) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserInChannel"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getConfigChannel"],
      });
    },
  });

  const { data: listUser } = useQuery({
    queryKey: ["getAllUser"],
    queryFn: () => {
      return getAllUser();
    },
  });

  const users = listUser || [];

  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const handleClick = () => {
    mutation.mutate({
      channelId,
      userIds: selectedValues,
    });

    setSelectedValues([]);
  };

  return (
    <div>
      <MultiSelect
        options={users.map((item) => {
          return {
            label: `${item.firstname} ${item.lastname}`,
            value: item.id,
          };
        })}
        selectedValues={selectedValues}
        cb={(value) => {
          setSelectedValues((prev) =>
            prev.includes(value)
              ? prev.filter((v) => v !== value)
              : [...prev, value]
          );
        }}
      />

      <Button
        className="mt-4 mb-4"
        disabled={selectedValues.length === 0}
        onClick={handleClick}
      >
        Sauvegarder
      </Button>
    </div>
  );
};

export default function ListUser({ channelId }: PropsChannelId) {
  const { data } = useQuery({
    queryKey: ["getUserInChannel"],
    queryFn: () => {
      return getUserInChannel(channelId);
    },
  });

  const options = data || [];

  return (
    <div>
      <h2 className="mt-5 mb-5">Total : {data?.length}</h2>
      <FormInsertPersonne channelId={channelId} />
      <Separator />

      {options.map((item) => (
        <UserComponent user={item.user} key={item.user.id} />
      ))}
    </div>
  );
}
