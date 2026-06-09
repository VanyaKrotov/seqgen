import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "~/shared/lib/cn";

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-[18px] w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--muted)_22%,transparent)]">
      <SliderPrimitive.Range className="absolute h-full rounded-[inherit] bg-[var(--accent)] shadow-[0_0_14px_color-mix(in_srgb,var(--accent)_38%,transparent)] transition-[background,box-shadow] duration-700" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-[17px] cursor-grab rounded-full border-[3px] border-[var(--accent)] bg-[var(--surface-strong)] shadow-[0_2px_8px_rgba(0,0,0,.28),0_0_0_3px_color-mix(in_srgb,var(--accent)_12%,transparent)] transition-[border-color,box-shadow,transform] duration-200 hover:scale-[1.08] hover:shadow-[0_2px_8px_rgba(0,0,0,.28),0_0_0_5px_color-mix(in_srgb,var(--accent)_16%,transparent)] focus-visible:outline-none focus-visible:shadow-[0_2px_8px_rgba(0,0,0,.28),0_0_0_5px_color-mix(in_srgb,var(--accent)_22%,transparent)] active:cursor-grabbing" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
