import { Toast } from "@toshusai/cmpui";
import { createContext, useState } from "react";

export const ToastContext = createContext<{
  showToast: (message: string) => void;
}>({
  showToast: () => {},
});

export const ToastProvider = (props: {
  children: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
      <ToastContext.Provider
        value={{
          showToast: (message) => {
            setMessage(message);
            setShow(true);
          },
        }}
      >
        {props.children}
        <Toast open={show} onOpenChange={setShow}>
          <div className="p-4">{message}</div>
        </Toast>
      </ToastContext.Provider>
    </>
  );
};
