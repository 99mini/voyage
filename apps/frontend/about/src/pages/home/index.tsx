import HorizontalLine from '@/components/common/horizontal-line';
import Hero from '@/components/hero/hero';
import ProjectSection from '@/components/hero/project-section';

import { projects } from '@/lib/constants/project';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="w-full">
        {projects.map((project, index) => (
          <>
            <ProjectSection key={project.title} {...project} />
            {index < projects.length - 1 && <HorizontalLine />}
          </>
        ))}
      </div>
    </>
  );
}
