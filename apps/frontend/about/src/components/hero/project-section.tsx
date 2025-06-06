export interface SectionProps {
  title: string;
  href: string;
  items: string[];
}

const ProjectSection = ({ title, href, items }: SectionProps) => {
  return (
    <section className="container py-10 w-full mx-auto px-4 md:px-0">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-4 w-full mb-2">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:underline hover:text-blue-400"
        >{`View ${title}`}</a>
      </div>
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <ul className="flex flex-col gap-1 w-full md:gap-2">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
