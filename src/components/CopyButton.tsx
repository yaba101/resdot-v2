import { CopyIcon } from "lucide-react";
import { type ButtonHTMLAttributes } from "react";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";

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
      variant="link"
      className={className}
    >
      <CopyIcon className="h-5 w-5  text-gray-200" />
    </Button>
  );
};

export default CopyButton;
