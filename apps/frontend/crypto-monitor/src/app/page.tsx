import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Services } from '@/components/services/services';
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Services />
    </div>
  );
}
