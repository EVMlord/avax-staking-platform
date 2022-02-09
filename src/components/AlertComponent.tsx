import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineWarning } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaRegTimesCircle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import clx from "classnames";

const alertRoot = document.getElementById("alert-root")!;

export interface AlertComponentProps {
  data: {
    title: string;
    message?: string;
  };
  delay?: number;
  type?: "error" | "success" | "warning" | "info";
  /** This prop should be controled by a state */
  show: boolean;
}
export default function AlertComponent({
  delay = 5000,
  show,
  ...props
}: AlertComponentProps) {
  // Controls the broadcast alert
  const [isShown, setIsShown] = useState(show);
  const timerId = useRef<NodeJS.Timeout>();

  const alertContent = <AlertContent isShown={isShown} {...props} />;

  useEffect(() => {
    setIsShown(show);

    timerId.current = setTimeout(() => {
      setIsShown(false);
    }, delay);
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [show, delay]);

  return ReactDOM.createPortal(alertContent, alertRoot);
}

function AlertContent({
  isShown,
  type = "info",
  data,
}: Omit<AlertComponentProps & { isShown: boolean }, "delay" | "show">) {
  const { title, message = "" } = data;

  const info = type === "info",
    success = type === "success",
    error = type === "error",
    warn = type === "warning";

  return (
    <div
      className={clx(
        "fixed top-20 right-0 translate-x-full transition duration-300 z-50 flex max-w-sm mb-4 font-sans",
        {
          "bg-teal-200": info,
          "bg-red-300": error,
          "bg-green-300": success,
          "bg-yellow-200": warn,
          "!translate-x-0 opacity-100": isShown,
        }
      )}
    >
      <div
        className={clx("w-14 flex-none flex justify-center items-center", {
          "bg-teal-500": info,
          "bg-red-400": error,
          "bg-green-500": success,
          "bg-yellow-500": warn,
        })}
      >
        <div className="p-2">
          {info && <AiOutlineWarning className="h-8 w-8" />}
          {warn && <RiErrorWarningLine className="h-8 w-8" />}
          {error && <FaRegTimesCircle className="h-8 w-8" />}
          {success && <FiCheckCircle className="h-8 w-8" />}
        </div>
      </div>
      <div className="w-auto text-gray-800 items-center p-2">
        <span className="text-lg font-bold pb-4">{title}</span>
        <p className="leading-tight text-sm">{message}</p>
      </div>
    </div>
  );
}
