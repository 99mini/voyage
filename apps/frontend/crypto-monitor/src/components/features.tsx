import Image from 'next/image';

export function Features() {
  return (
    <div className="container mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-normal">Our Amazing Features</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Discover the powerful features that make our platform stand out from the competition.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-background border rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-2 bg-blue-100 rounded-lg w-fit mb-4">
            <Image src="/window.svg" alt="Security icon" width={24} height={24} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-normal">Advanced Security</h3>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">
            State-of-the-art security measures to protect your assets and data.
          </p>
        </div>
        <div className="p-6 bg-background border rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-2 bg-blue-100 rounded-lg w-fit mb-4">
            <Image src="/file.svg" alt="Analytics icon" width={24} height={24} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-normal">Real-time Analytics</h3>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">
            Monitor market trends and portfolio performance in real-time.
          </p>
        </div>
        <div className="p-6 bg-background border rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-2 bg-blue-100 rounded-lg w-fit mb-4">
            <Image src="/globe.svg" alt="Trading icon" width={24} height={24} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-normal">Smart Trading</h3>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">
            Automated trading strategies with customizable parameters.
          </p>
        </div>
      </div>
    </div>
  );
}
