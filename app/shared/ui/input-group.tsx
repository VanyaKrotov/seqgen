import * as React from "react";
import { cn } from "~/shared/lib/cn";

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid h-[46px] w-full grid-cols-[46px_minmax(0,1fr)_46px] overflow-hidden rounded-[11px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_74%,transparent)] transition-[border-color,box-shadow] focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_15%,transparent)]",
      className,
    )}
    {...props}
  />
));
InputGroup.displayName = "InputGroup";

const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      "grid cursor-pointer place-items-center border-0 bg-transparent p-0 text-[var(--muted)] transition-colors first:border-r first:border-[var(--border)] last:border-l last:border-[var(--border)] enabled:hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] enabled:hover:text-[var(--text)] focus-visible:relative focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[3px] focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-[.35] [&_svg]:size-4",
      className,
    )}
    {...props}
  />
));
InputGroupButton.displayName = "InputGroupButton";

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "min-w-0 w-full appearance-none border-0 bg-transparent px-2 text-center font-mono text-sm font-semibold leading-none text-[var(--text)] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
      className,
    )}
    {...props}
  />
));
InputGroupInput.displayName = "InputGroupInput";

export { InputGroup, InputGroupButton, InputGroupInput };
