export interface SectionProps {
  title: string;
  href: string;
  children: React.ReactNode;
}

export default function ProjectSection({ title, href, children }: SectionProps) {
  return (
    <section className="container py-10 w-full mx-auto ">
      <div className="flex flex-row space-x-4 items-end w-full">
        <h2 className="text-2xl md:text-xl font-bold">{title}</h2>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:underline hover:text-blue-400"
        >{`${title} 바로가기`}</a>
      </div>
      <div className="container">{children}</div>
    </section>
  );
}
