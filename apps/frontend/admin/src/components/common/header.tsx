import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router';

import {
  cn,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@packages/vds';

import { useAuth } from '@/contexts/auth/auth-context';

import { PUBLIC_PAGE_TITLE, PROTECTED_PAGE_TITLE, PUBLIC_PATH, PROTECTED_PATH } from '@/lib/route-constants';

const LinkItem = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => {
  return (
    <li>
      <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), isActive ? 'hover:text-blue-700' : '')}>
        <NavLink to={to} className={cn(isActive ? 'text-blue-400 underline ' : 'text-gray-300')}>
          {children}
        </NavLink>
      </NavigationMenuLink>
    </li>
  );
};

function Header() {
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  const path = useMemo(() => location.pathname.split('/')[1], [location.pathname]);

  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <a href="/">{PUBLIC_PAGE_TITLE.ROOT}</a>
        </h1>
        <NavigationMenu orientation="vertical">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-black">메뉴</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col gap-3 p-4">
                  {Object.entries(isAuthenticated ? PROTECTED_PATH : PUBLIC_PATH)
                    .slice(isAuthenticated ? 0 : 1)
                    .map(([key, value]) => {
                      return (
                        <LinkItem key={value} to={value} isActive={value.slice(1) === path}>
                          {isAuthenticated
                            ? PROTECTED_PAGE_TITLE[key as keyof typeof PROTECTED_PAGE_TITLE]
                            : PUBLIC_PAGE_TITLE[key as keyof typeof PUBLIC_PAGE_TITLE]}
                        </LinkItem>
                      );
                    })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export default Header;
