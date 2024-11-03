"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressVariants = cva("h-full transition-all", {
    variants: {
        variant: {
            default: "bg-slate-900 dark:bg-slate-50",
            primary: "bg-indigo-500 dark:bg-indigo-500",
            destructive: "bg-red-500 dark:bg-red-900",
            warning: "bg-yellow-500 dark:bg-yellow-500",
            critical: "bg-red-500 dark:bg-red-500",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const progressRootVariants = cva("relative h-4 w-full overflow-hidden rounded-full", {
    variants: {
        rootVariant: {
            default: "bg-slate-100 dark:bg-slate-800",
            primary: "bg-indigo-100 dark:bg-indigo-900",
            destructive: "bg-red-100 dark:bg-red-900",
        },
    },
    defaultVariants: {
        rootVariant: "default",
    },
});

export interface ProgressProps
    extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressRootVariants> {
    value: number;
    type?: "default" | "dynamic";
    maxValue?: number;
}

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressProps
>(({ className, value, variant, rootVariant, type = "default", maxValue = 100, ...props }, ref) => {
    const computedVariant = React.useMemo(() => {
        if (type === "dynamic") {
            const percentage = (value / maxValue) * 100;
            if (percentage >= 80) return "critical";
            if (percentage >= 60) return "warning";
            return variant;
        }
        return variant;
    }, [type, value, maxValue, variant]);

    return (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(progressRootVariants({ rootVariant }), className)}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className={cn(progressVariants({ variant: computedVariant }))}
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    );
});
Progress.displayName = "Progress";

export { Progress, progressVariants, progressRootVariants };