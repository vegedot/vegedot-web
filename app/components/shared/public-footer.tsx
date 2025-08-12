import { cn } from '~/lib/utils'

export default function PublicFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'footer'>) {
  return (
    <footer className={cn('bg-primary py-4 text-center', className)} {...props}>
      <p className="text-primary-foreground text-xs">&copy; 2025 vegedot</p>
    </footer>
  )
}
