import { useState } from "react";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/TextArea";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/Toast";

type ModalProps = {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  actionTitle: string;
};

export function Modal({
  title,
  description,
  actionTitle,
  setDescription,
  setTitle,
}: ModalProps) {
  const [closeModal, setCloseModal] = useState(false);
  const { user } = useUser();
  const ctx = api.useContext();
  const { mutate, isLoading: isCreating } = api.roomList.add.useMutation({
    onSuccess: () => {
      toast({
        message: "Successfully created!",
        title: "create new room",
        type: "success",
      });
    },
    onSettled: () => {
      void ctx.roomList.invalidate();
      setTitle("");
      setDescription("");
      setCloseModal(false);
    },
    onError: () => {
      toast({
        message: "Error has occurred,try again!",
        title: "can't create room",
        type: "error",
      });
    },
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setCloseModal(true)}>
            {actionTitle} Room
          </Button>
        </DialogTrigger>
        {closeModal && (
          <>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{actionTitle}</DialogTitle>
                <DialogDescription>
                  Click save when {"you're"} done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right text-white">
                    Title
                  </Label>
                  <Input
                    disabled={isCreating}
                    id="title"
                    value={title}
                    className="col-span-3 text-white"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="description"
                    className="text-right text-white"
                  >
                    Description
                  </Label>
                  <Textarea
                    disabled={isCreating}
                    id="description"
                    value={description}
                    className="col-span-3"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={isCreating || title === "" || description === ""}
                  type="submit"
                  onClick={() => {
                    mutate({
                      title: title,
                      description: description,
                      userId: user?.id ?? "",
                    });
                  }}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Save changes
                    </>
                  ) : (
                    <>Save changes</>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
