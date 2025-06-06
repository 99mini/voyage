import React from 'react';

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
          <React.Fragment key={project.title}>
            <ProjectSection {...project} />
            {index < projects.length - 1 && <HorizontalLine />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
