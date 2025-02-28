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

import { PAGE_TITLE, ROUTE_PATH } from '@/lib/constant';

const LinkItem = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => {
  return (
    <NavLink to={to} className={cn(isActive ? 'text-blue-400 underline ' : 'text-gray-300')}>
      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive ? 'hover:text-blue-700' : '')}>
        {children}
      </NavigationMenuLink>
    </NavLink>
  );
};

function Header() {
  const location = useLocation();

  const path = useMemo(() => location.pathname.split('/')[1], [location.pathname]);

  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <a href="/">{PAGE_TITLE.ROOT}</a>
        </h1>
        <NavigationMenu orientation="vertical">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-black">웹 툴</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col gap-3 p-4">
                  {Object.entries(ROUTE_PATH)
                    .slice(1)
                    .map(([key, value]) => {
                      return (
                        <LinkItem key={value} to={value} isActive={value.slice(1) === path}>
                          {PAGE_TITLE[key as keyof typeof PAGE_TITLE]}
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
