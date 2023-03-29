import { api } from "@/utils/api";
import { DropdownMenuItem } from "./ui/DropDownMenu";
import { Trash2 } from "lucide-react";

const DeleteRoom = ({ id }: { id: string }) => {
  const ctx = api.useContext();

  const { mutate: deleteRoom } = api.roomList.delete.useMutation({
    onSuccess: () => {
      void ctx.roomList.invalidate();
    },
  });
  return (
    <>
      <DropdownMenuItem
        onClick={() => {
          deleteRoom({
            id,
          });
        }}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    </>
  );
};

export default DeleteRoom;
