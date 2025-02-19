import type { MetaFunction } from '@remix-run/node';
import ProjectSection from '~/components/common/project-section';

export const meta: MetaFunction = () => {
  return [{ title: 'Zero Voyage' }, { name: 'description', content: 'Welcome to Zero Voyage!' }];
};

export default function Index() {
  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full">
        <ProjectSection title="웹 도구" href="https://tool.zerovoyage.com/">
          <div className="flex flex-col items-center gap-4">
            <div>someting content...</div>
            <div>someting content...</div>
            <div>someting content...</div>
            <div>someting content...</div>
            <div>someting content...</div>
          </div>
        </ProjectSection>
      </div>
    </div>
  );
}
