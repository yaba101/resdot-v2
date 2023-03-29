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
import { useState } from "react";

export function CreateModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription>
            Click save when {"you're"} done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-white">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3 text-white"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex items-end justify-between">
          <Button type="submit">Cancel</Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
