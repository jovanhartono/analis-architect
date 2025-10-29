"use client";

import { Media } from "@/payload-types";
import { XIcon } from "lucide-react";
import Image from "next/image";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type DialogState = {
  openDialog: (media: Media) => void;
  closeDialog: () => void;
};
const DialogImageContext = createContext<DialogState | null>(null);

export default function DialogImageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const openDialog = (image: Media) => {
    setSelectedMedia(image);
    setImageLoaded(false);
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
      // Trigger animation
      requestAnimationFrame(() => {
        dialog.classList.add("dialog-open");
      });
    }
  };

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.classList.remove("dialog-open");
      // Wait for animation to complete before closing
      setTimeout(() => {
        dialog.close();
        setSelectedMedia(null);
        setImageLoaded(false);
      }, 200);
    }
  };

  // Listen for dialog close event (handles ESC key)
  useEffect(() => {
    const dialog = dialogRef.current;

    const handleClose = () => {
      dialog?.classList.remove("dialog-open");
      setSelectedMedia(null);
      setImageLoaded(false);
    };

    dialog?.addEventListener("close", handleClose);

    return () => {
      dialog?.removeEventListener("close", handleClose);
    };
  }, []);

  return (
    <DialogImageContext value={{ closeDialog, openDialog }}>
      {children}
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/90 backdrop:backdrop-blur-sm bg-transparent opacity-0 scale-95 transition-all duration-200 ease-out [&.dialog-open]:opacity-100 [&.dialog-open]:scale-100 m-auto outline-none z-50 p-0 max-w-screen-xl"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog();
        }}
      >
        {selectedMedia && (
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={closeDialog}
              className="absolute top-3 right-3 flex items-center justify-center size-6 rounded-full cursor-pointer z-10 bg-white"
            >
              <XIcon className="text-gray-700 size-4" />
            </button>

            <Image
              alt="preview"
              src={selectedMedia.url!}
              width={selectedMedia.width || 1000}
              height={selectedMedia.height || 1000}
              sizes="(max-width: 1024px) 100vw, 1440px"
              draggable="false"
              className={`transition-all duration-300 object-contain max-w-[min(1440px,_calc(100vw_-_32px))] max-h-[95vh] ease-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}
      </dialog>
    </DialogImageContext>
  );
}

export function useImageDialog() {
  const ctx = useContext(DialogImageContext);

  if (ctx === null) {
    throw new Error("useImageDialog must be used within a DialogImageProvider");
  }

  return ctx;
}
