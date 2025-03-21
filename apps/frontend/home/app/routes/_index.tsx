import type { MetaFunction } from '@remix-run/node';

import Footer from '~/components/common/footer';
import Hero from '~/components/hero/hero';
import ProjectSection from '~/components/hero/project-section';

const HorizontalLine = () => <hr className="my-4" />;

export const meta: MetaFunction = () => {
  return [{ title: 'Zero Voyage' }, { name: 'description', content: 'Welcome to Zero Voyage!' }];
};

export default function Index() {
  return (
    <main className="h-screen w-screen">
      <Hero />
      <div className="w-full">
        <ProjectSection title="Crypto Analytics" href="https://coin.zerovoyage.com/">
          <div className="flex flex-col items-center gap-4">
            <h3>Crypto Analytics</h3>
            <ul className="flex flex-col gap-2 w-full md:gap-4">
              <li>daily technical analysis</li>
              <li>mailing service</li>
            </ul>
          </div>
        </ProjectSection>
        <HorizontalLine />
        <ProjectSection title="Web Tools" href="https://tool.zerovoyage.com/">
          <div className="flex flex-col items-center gap-4">
            <h3>Web Tools</h3>
            <ul className="flex flex-col gap-2 w-full md:gap-4">
              <li>Image merge</li>
              <li>Video to gif</li>
            </ul>
          </div>
        </ProjectSection>
        <HorizontalLine />
        <ProjectSection title="Technical Blog" href="https://tech.zerovoyage.com/">
          <div className="flex flex-col items-center gap-4">
            <h3>Technical Blog</h3>
            <ul className="flex flex-col gap-2 w-full md:gap-4">
              <li>IT qualifications study</li>
              <li>Computer Science study</li>
              <li>Troubleshooting</li>
            </ul>
          </div>
        </ProjectSection>
        <HorizontalLine />
        <ProjectSection title="VDS" href="https://design.zerovoyage.com/">
          <div className="flex flex-col items-center gap-4">
            <h3>Design System - Storybook</h3>
            <ul className="flex flex-col gap-2 w-full md:gap-4">
              <li>UI Component Library</li>
              <li>Storybook | tailwindcss | shadcn</li>
            </ul>
          </div>
        </ProjectSection>
        <HorizontalLine />
        <ProjectSection title="Awesome" href="https://awesome.zerovoyage.com/">
          <div className="flex flex-col items-center gap-4">
            <h3>Awesome</h3>
            <ul className="flex flex-col gap-2 w-full md:gap-4">
              <li>Just for fun</li>
              <li>Interactive design</li>
            </ul>
          </div>
        </ProjectSection>
      </div>
      <Footer />
    </main>
  );
}
