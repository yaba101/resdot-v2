import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Textarea } from "@/components/ui/TextArea";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { api } from "@/utils/api";
import { Edit } from "lucide-react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/Toast";

type SideModalProps = {
  title: string;
  description: string;
  id: string;
};
export function SideModal({ title, description, id }: SideModalProps) {
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const ctx = api.useContext();
  const { mutate: editRoom, isLoading: isUpdating } =
    api.roomList.edit.useMutation({
      onSuccess: () => {
        toast({
          message: "Successfully updated!",
          title: "update room details",
          type: "success",
        });
      },
      onSettled: () => {
        void ctx.roomList.invalidate();
        setCloseModal(false);
      },
      onError: () => {
        toast({
          message: "Error has occurred,try again!",
          title: "can't updated room",
          type: "error",
        });
      },
    });
  function handleAfterMutation() {
    setCloseModal(true);
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" size="sm" onClick={handleAfterMutation}>
            <Edit className="cursor-pointer text-white" />
          </Button>
        </SheetTrigger>
        {closeModal && (
          <>
            <SheetContent position="right" size="default">
              <SheetHeader>
                <SheetTitle>Edit Room</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when{"you're"}{" "}
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right text-white">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 text-white">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={currentDescription}
                    onChange={(e) => setCurrentDescription(e.target.value)}
                    className="col-span-3 text-white"
                  />
                </div>
              </div>
              <SheetFooter>
                <Button
                  disabled={isUpdating}
                  type="submit"
                  onClick={() => {
                    editRoom({
                      id,
                      title: currentTitle,
                      description: currentDescription,
                    });
                    handleAfterMutation();
                  }}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Save changes
                    </>
                  ) : (
                    <>Save changes</>
                  )}
                </Button>
              </SheetFooter>
            </SheetContent>
          </>
        )}
      </Sheet>
    </div>
  );
}
