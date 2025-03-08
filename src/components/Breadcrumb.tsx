'use client';

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Crumb {
  label: string;
  href: string;
}

function generateCrumbs(pathname: string): Crumb[] {
  const paths = pathname.split('/').filter(Boolean);
  return paths.map((label, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    // Capitalize first letter and replace hyphens with spaces
    const formattedLabel = label
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return { label: formattedLabel, href };
  });
}

export function Breadcrumb() {
  const pathname = usePathname();
  const crumbs = generateCrumbs(pathname);

  return (
    <nav className="flex items-center space-x-1 text-sm text-[--text-secondary]">
      <Link 
        href="/" 
        className="flex items-center hover:text-[--text-primary]"
      >
        <HomeIcon className="w-4 h-4" />
      </Link>
      {crumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center">
          <ChevronRightIcon className="w-4 h-4 mx-1" />
          <Link
            href={crumb.href}
            className={index === crumbs.length - 1 
              ? "text-[--text-primary] font-medium" 
              : "hover:text-[--text-primary]"
            }
          >
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
} 