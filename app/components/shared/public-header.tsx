import { cn } from "~/lib/utils";

export default function PublicHeader({className,...props}:React.ComponentPropsWithoutRef<'header'>) {
  return (
    <header className={cn('bg-primary flex items-center justify-center gap-4 px-4 py-1', className)} {...props}>
      <h1 className="text-primary-foreground">vegedot</h1>
    </header>
  );
}
