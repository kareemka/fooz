import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    as?: React.ElementType;
}

const Container = ({ children, className, as: Component = "div" }: { children: ReactNode, className?: string, as?: any }) => {
    return (
        <Component className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
            {children}
        </Component>
    );
};

export default Container;
