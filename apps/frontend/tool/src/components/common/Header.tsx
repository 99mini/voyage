import { NavLink, useLocation } from "react-router";

import { ROUTE_PATH, PAGE_TITLE } from "@/constant";
import { useMemo } from "react";

const LinkItem = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => {
  return (
    <li>
      <NavLink to={to} className={isActive ? "text-blue-400 underline" : "text-gray-300 hover:text-white"}>
        {children}
      </NavLink>
    </li>
  );
};

function Header() {
  const location = useLocation();

  const path = useMemo(() => location.pathname.split("/")[1], [location.pathname]);

  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <a href="/">{PAGE_TITLE.ROOT}</a>
        </h1>
        <ul className="flex gap-4">
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
      </nav>
    </header>
  );
}

export default Header;
