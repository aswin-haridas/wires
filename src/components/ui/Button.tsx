import React from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  onClick: () => void;
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon: Icon,
  children,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const baseClasses =
    "font-medium transition-colors flex items-center space-x-2 rounded-lg";

  const variantClasses = {
    primary: "bg-black hover:bg-gray-800 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {Icon && <Icon className={iconSizes[size]} />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
