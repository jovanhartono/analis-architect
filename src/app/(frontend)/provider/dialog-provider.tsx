"use client";

import { Dialog, DialogContent } from "@/app/(frontend)/components/ui/dialog";
import { createContext, ReactNode, useContext, useState } from "react";

type DialogOpen = {
  content: ReactNode;
};

type DialogContextType = {
  open: (args: DialogOpen) => void;
};
const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode>(null);
  function openDialog({ content }: DialogOpen) {
    setOpen(true);
    setContent(content);
  }

  function closeDialog() {
    
    setContent(null);
  }

  return (
    <DialogContext value={{ open: openDialog }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>{content}</DialogContent>
      </Dialog>
      {children}
    </DialogContext>
  );
}

export function useDialog() {
  const ctx = useContext(DialogContext);

  if (ctx === null) {
    throw new Error("useDialog can only be used within DialogProvider");
  }

  return ctx;
}
