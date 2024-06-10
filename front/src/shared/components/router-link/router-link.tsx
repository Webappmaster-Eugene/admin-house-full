import { forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';

export const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>(({ ...props }, ref) => (
  <Link ref={ref} {...props} />
));
