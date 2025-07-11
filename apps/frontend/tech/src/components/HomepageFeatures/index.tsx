import clsx from 'clsx';

import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: React.ReactNode;
  href?: string;
  to?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '기술 블로그',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: <>javascript, typescript 기반 기술 블로그</>,
    to: '/blog',
  },
  {
    title: '컴퓨터 과학',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: <>정보처리기사, SQLD, 컴퓨터 과학 기초 학문 정리합니다.</>,
    to: '/docs/intro',
  },
  {
    title: 'Zero Voyage',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: <>0부터 시작하는 항해: zerovoyage의 모든 제품 확인하기</>,
    href: 'https://about.zerovoyage.com',
  },
  // {
  //   title: 'Focus on What Matters',
  //   Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
  //   description: (
  //     <>
  //       Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go ahead and move your docs into the{' '}
  //       <code>docs</code> directory.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Powered by React',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the same
  //       header and footer.
  //     </>
  //   ),
  // },
];

function Feature({ title, Svg, description, href, to }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {href && (
          <Link href={href} className={styles.more_link}>
            <>
              <span>{`${title} 자세히 보기`}</span>
              <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" className={styles.icon}>
                <path
                  fill="currentColor"
                  d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
                ></path>
              </svg>
            </>
          </Link>
        )}
        {to && <Link to={to}>{`${title} 자세히 보기`}</Link>}
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.ReactNode {
  return (
    <section className={styles.features_container}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2">Feature</Heading>
        </div>
      </div>
      <div className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props) => (
              <Feature key={props.title} {...props} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
