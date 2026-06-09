import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "~/shared/lib/cn";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-[46px] w-full cursor-pointer items-center justify-between gap-2.5 rounded-[11px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_74%,transparent)] px-[13px] text-[var(--text)] outline-none transition-[border-color,box-shadow] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_15%,transparent)] data-[placeholder]:text-[var(--muted)]",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="size-4 shrink-0 text-[var(--muted)]" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex h-7 items-center justify-center text-[var(--muted)] [&_svg]:size-[15px]",
      className,
    )}
    {...props}
  >
    <ChevronUp />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex h-7 items-center justify-center text-[var(--muted)] [&_svg]:size-[15px]",
      className,
    )}
    {...props}
  >
    <ChevronDown />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    accent?: string;
  }
>(({ accent, className, children, position = "popper", style, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)] shadow-[var(--shadow)] animate-select-in",
        className,
      )}
      position={position}
      sideOffset={6}
      style={{
        ...style,
        "--select-accent": accent,
      } as React.CSSProperties}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className="p-[5px]">
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex min-h-9 cursor-pointer select-none items-center rounded-lg py-[7px] pl-2.5 pr-8 text-[13px] outline-none hover:bg-[color-mix(in_srgb,var(--select-accent,#9b5cff)_18%,var(--surface-strong))] data-[highlighted]:bg-[color-mix(in_srgb,var(--select-accent,#9b5cff)_18%,var(--surface-strong))] data-[disabled]:pointer-events-none data-[disabled]:opacity-[.45]",
      className,
    )}
    {...props}
  >
    <span className="absolute right-[9px] grid place-items-center text-[var(--select-accent,#9b5cff)] [&_svg]:size-[15px]">
      <SelectPrimitive.ItemIndicator>
        <Check />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
};
