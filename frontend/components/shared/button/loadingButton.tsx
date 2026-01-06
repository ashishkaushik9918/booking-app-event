"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

interface LoadingButtonProps {
    loading?: boolean;
    text: string;
    icon?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    colorClass?: string;
    className?: string,
    children?:React.ReactNode
}

export default function LoadingButton({
    loading = false,
    text,
    icon,
    type = "button",
    colorClass ,
    className,
    ...props
    
}: LoadingButtonProps) {
    return (
        <Button
            type={type}
            disabled={loading}
            className={clsx(
                "flex items-center justify-center px-4 py-2 rounded-md",
                colorClass,
                className
            )}
            {...props}
        >
            {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                icon && <span className="mr-2">{icon}</span>
            )}
            {loading ? "Loading..." : text}
        </Button>
    );
}
