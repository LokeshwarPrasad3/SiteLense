import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
  via?: string;
}

export function GradientText({
  children,
  className,
  from = 'from-indigo-600',
  to = 'to-blue-600',
  via = 'via-purple-500',
}: GradientTextProps) {
  return (
    <span className={cn('bg-linear-to-r bg-clip-text text-transparent', from, via, to, className)}>
      {children}
    </span>
  );
}
