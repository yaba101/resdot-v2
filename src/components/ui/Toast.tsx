// import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import * as React from "react";
import hotToast, { Toaster as HotToaster } from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const Toaster = HotToaster;

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

export function Toast({ visible, className, ...props }: ToastProps) {
  return (
    <div
      className={cn(
        "min-h-16 mb-2 flex w-[350px] flex-col items-start gap-1 rounded-md bg-white px-6 py-4 shadow-lg",
        visible && "animate-in slide-in-from-bottom-5",
        className
      )}
      {...props}
    />
  );
}

type ToastTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

Toast.Title = function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <p className={cn("text-sm font-medium", className)} {...props} />;
};

type ToastDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

Toast.Description = function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return <p className={cn("text-sm opacity-80", className)} {...props} />;
};

interface ToastOpts {
  title?: string;
  message: string;
  type?: "success" | "error" | "default";
  duration?: number;
}

export function toast(opts: ToastOpts) {
  const { title, message, type = "default", duration = 3000 } = opts;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return hotToast.custom(
    ({ visible }) => (
      <Toast
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        visible={visible}
        className={cn({
          "bg-red-600 text-white": type === "error",
          "bg-black text-white": type === "success",
        })}
      >
        <Toast.Title>{title}</Toast.Title>
        {message && <Toast.Description>{message}</Toast.Description>}
      </Toast>
    ),
    { duration }
  );
}
