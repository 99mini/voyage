import { ROUTE_PATH, PAGE_TITLE } from "@/constant";
import { Link } from "react-router";

const LinkItem = ({ to, title }: { to: string; title: string }) => {
  return (
    <li className="text-blue-400 underline hover:text-blue-600">
      <Link to={to} about={"This is a link to " + title}>
        {title}
      </Link>
    </li>
  );
};

const Home = () => {
  return (
    <div className="container mx-auto">
      <ul className="space-y-2">
        {Object.entries(ROUTE_PATH)
          .slice(1)
          .map(([key, path]) => {
            return <LinkItem key={path} to={path} title={PAGE_TITLE[key as keyof typeof PAGE_TITLE]} />;
          })}
      </ul>
    </div>
  );
};

export default Home;
