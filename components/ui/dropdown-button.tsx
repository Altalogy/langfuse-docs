"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HoverCorners } from "./corner-box";
import { ChevronDownIcon } from "lucide-react";

type DropdownButtonSize = "default" | "small";

const sizeClasses: Record<DropdownButtonSize, { root: string }> = {
  default: {
    root: "h-[32px]",
  },
  small: {
    root: "h-[26px]",
  },
};

const buttonBaseClasses =
  "inline-flex w-full min-w-0 max-w-full items-center justify-center no-underline gap-[6px] overflow-hidden py-0.75 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: DropdownButtonSize;
  className?: string;
  asChild?: boolean;
  shortcutKey?: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  wrapperClassName?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

const DropdownButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      size,
      asChild = false,
      wrapperClassName,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const resolvedSize: DropdownButtonSize = size === "small" ? "small" : "default";

    const innerRef = React.useRef<HTMLElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );
    const setAnchorRef = React.useCallback((node: HTMLAnchorElement | null) => {
      innerRef.current = node;
    }, []);


    const iconEl = (
      <span
        className="button-icon-area flex shrink-0 items-center justify-center h-full aspect-square [&>*]:max-w-full rounded-[1px] border-[0.5px] border-[rgba(64,61,57,0.20)] bg-[rgba(64,61,57,0.10)] dark:bg-transparent p-[2px] text-button-icon"
        aria-hidden
      >
        <ChevronDownIcon className="w-3 h-3" />
      </span>
    )

    const content = (
      <>
        <span
          className={cn(
            "flex items-center min-w-0 truncate",
          )}
        >
          {children}
        </span>
        {iconEl}
      </>
    );


    const isSmallSize = resolvedSize === "small";
    const leftPaddingClass = isSmallSize ? "pl-[6px]" : "pl-[8px]";
    const rightPaddingClass = "pr-1.5 lg:pr-[3px]"
    const buttonPaddingClasses = `${leftPaddingClass} ${rightPaddingClass}`;

    const controlClassName = cn(sizeClasses[resolvedSize].root, className, buttonPaddingClasses);

    const buttonControlClassName = cn(
      buttonBaseClasses,
      controlClassName,
      "gap-[6px] justify-start"
    );

    const buttonEl = (
      <button
        ref={setRefs}
        disabled={disabled}
        className={buttonControlClassName}
        {...props}
      >
        {content}
      </button>
    );


    return (
      <div className={cn("relative p-1 group button-wrapper", wrapperClassName)}>
        <HoverCorners />
        {buttonEl}
      </div>
    );
  }
);
DropdownButton.displayName = "DropdownButton";

export { DropdownButton };
