import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClickAway } from "react-use";

interface Props {
  onCancel?: () => void;
  onConfirm?: () => void;
  onClose: () => void;
  open: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
}

export default memo(
  ({ open, onClose, title, children, onCancel, onConfirm }: Props) => {
    const ref = useRef(null);

    useEffect(() => {
      if (open) {
        document
          .getElementById("root")
          ?.style.setProperty("overflow", "hidden");
      } else {
        document.getElementById("root")?.style.setProperty("overflow", "auto");
      }
    }, [open]);

    useClickAway(ref, () => {
      onClose();
    });

    return (
      <>
        {open && (
          <div className="fixed top-0 bottom-0 left-0 right-0 z-10 m-auto max-w-[23.4375rem] bg-black/60">
            <div
              className="absolute bottom-0 mr-3 flex h-4/5 w-full grow flex-col bg-white py-6 px-5"
              ref={ref}
            >
              <div className="mb-6 flex flex-row">
                <span className="grow text-base font-medium leading-5 text-cBlack">
                  {title}
                </span>
                <img
                  className="ml-3 h-5 w-5"
                  src="/close.svg"
                  onClick={onClose}
                ></img>
              </div>
              <div className="overflow-auto">{children}</div>
              <div className="mt-6">
                <div
                  className="button cancel mr-[0.9375rem]"
                  onClick={onCancel}
                >
                  取消
                </div>
                <span className="button confirm" onClick={onConfirm}>
                  确定
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);
