"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetContent = React.forwardRef(
  ({ className, side = "left", ...props }, ref) => (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 bg-black/50" />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          "fixed top-0 z-50 h-full w-64 bg-white shadow-lg transition-transform",
          side === "left" && "left-0",
          side === "right" && "right-0",
          className
        )}
        {...props}
      />
    </SheetPrimitive.Portal>
  )
);
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
