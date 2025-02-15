import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type PropsModalCustom = {
  open?: boolean;
  title: string;
  content: string | ReactNode;
  onClose?: (value: boolean) => void;
};

export default function ModalCustom({
  open,
  title,
  content,
  onClose,
}: PropsModalCustom) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (onClose) onClose(value);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
