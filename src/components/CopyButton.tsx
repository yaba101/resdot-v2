import { CopyIcon } from "lucide-react";
import { type ButtonHTMLAttributes } from "react";
import Button from "./ui/Button";
import { toast } from "./ui/Toast";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}
const CopyButton = ({ className, valueToCopy, ...props }: CopyButtonProps) => {
  return (
    <Button
      {...props}
      onClick={() => {
        void navigator.clipboard.writeText(valueToCopy);
        toast({
          title: "copied",
          message: "Copied to clipboard",
          type: "success",
        });
      }}
      variant="ghost"
      className={className}
    >
      <CopyIcon className="h-5 w-5" />
    </Button>
  );
};

export default CopyButton;
