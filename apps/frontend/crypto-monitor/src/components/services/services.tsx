import Image from 'next/image';

export function Services() {
  return (
    <div className="container mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-normal">Our Services</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          We provide comprehensive cryptocurrency monitoring and trading services to help you succeed in the digital
          asset market.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-background border rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-2 bg-blue-100 rounded-lg w-fit mb-4">
            <Image src="/window.svg" alt="Portfolio Management icon" width={24} height={24} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-normal">Portfolio Management</h3>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">
            Track and manage your cryptocurrency portfolio with advanced tools and insights.
          </p>
        </div>
        <div className="p-6 bg-background border rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-2 bg-blue-100 rounded-lg w-fit mb-4">
            <Image src="/file.svg" alt="Market Analysis icon" width={24} height={24} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-normal">Market Analysis</h3>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">
            Get detailed market analysis and trends to make informed trading decisions.
          </p>
        </div>
        <div className="p-6 bg-background border rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-2 bg-blue-100 rounded-lg w-fit mb-4">
            <Image src="/globe.svg" alt="Trading Automation icon" width={24} height={24} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-normal">Trading Automation</h3>
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">
            Automate your trading strategies with customizable rules and parameters.
          </p>
        </div>
      </div>
    </div>
  );
}
