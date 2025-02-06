import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <div className="container mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-blue-500 tracking-wide">
          Advanced Cryptocurrency Monitoring Platform
        </h1>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Image src="/window.svg" alt="Real-time icon" width={24} height={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 tracking-normal">Real-time Monitoring</h3>
              <p className="text-foreground/60 leading-relaxed">
                Track your cryptocurrency investments with real-time updates and advanced analytics.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Image src="/file.svg" alt="Analysis icon" width={24} height={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 tracking-normal">Technical Analysis</h3>
              <p className="text-foreground/60 leading-relaxed">
                Make informed decisions with our comprehensive technical analysis tools.
              </p>
            </div>
          </div>
        </div>
        <Button size="lg" className="rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">
          Get Started
        </Button>
      </div>
      <div className="relative h-[500px]">
        <Image
          src="/globe.svg"
          alt="Cryptocurrency illustration"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
}
