import type { MetaFunction } from '@remix-run/node';

import Footer from '~/components/common/footer';
import Hero from '~/components/hero/hero';
import ProjectSection from '~/components/hero/project-section';

export const meta: MetaFunction = () => {
  return [{ title: 'Zero Voyage' }, { name: 'description', content: 'Welcome to Zero Voyage!' }];
};

export default function Index() {
  return (
    <main className="h-screen w-screen">
      <Hero />
      <div className="w-full">
        <ProjectSection title="웹 도구" href="https://tool.zerovoyage.com/">
          <div className="flex flex-col items-center gap-4">
            <h3>웹 페이지에서 사용할 수 있는 도구를 만나보세요</h3>
            <ul className="flex flex-col gap-2 w-full md:gap-4">
              <li>이미지 세로 병합</li>
              <li>비디오를 gif로 변환</li>
            </ul>
          </div>
        </ProjectSection>
        <hr className="my-4" />
        <ProjectSection title="기술 블로그" href="https://tech.zerovoyage.com/">
          <div className="flex flex-col items-center gap-4">
            <h3>기술 블로그</h3>
            <ul className="flex flex-col gap-2 w-full md:gap-4">
              <li>IT 직무 자격증 공부</li>
              <li>Computer Science 학습</li>
              <li>트러블 슈팅</li>
            </ul>
          </div>
        </ProjectSection>
        <hr className="my-4" />
        <ProjectSection title="암호화폐 기술적 분석" href="https://coin.zerovoyage.com/">
          <div className="flex flex-col items-center gap-4">
            <h3>암호화폐 기술적 분석 메일링 서비스</h3>
            <ul className="flex flex-col gap-2 w-full md:gap-4">
              <li>업비트 상장 암호화폐의 daily 기술적 분석 제공</li>
              <li>회원가입 후 최대 3개의 코인을 기술적 분석하여 메일링 제공</li>
            </ul>
          </div>
        </ProjectSection>
      </div>
      <Footer />
    </main>
  );
}
