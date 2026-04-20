import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@vibe/utils"; // classnames 통합 유틸리티

/**
 * 선언적 컴포넌트 스타일 정의 (AI가 읽기 가장 좋은 구조)
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-default font-medium transition-all active:scale-95 disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-foreground hover:bg-secondary/80",
        outline: "border border-slate-200 bg-transparent hover:bg-slate-100",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
};
