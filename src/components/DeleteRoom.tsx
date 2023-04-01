import { api } from "@/utils/api";
import { DropdownMenuItem } from "./ui/DropDownMenu";
import { Trash2 } from "lucide-react";
import { toast } from "./ui/Toast";

const DeleteRoom = ({ id }: { id: string }) => {
  const ctx = api.useContext();

  const { mutate: deleteRoom } = api.roomList.delete.useMutation({
    onSuccess: () => {
      void ctx.roomList.invalidate();
      toast({
        message: "Successfully delete the room",
        title: "delete room",
        type: "success",
      });
    },
    onError: () => {
      toast({
        message: "Error occured,try again",
        title: "can't delete room",
        type: "error",
      });
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
