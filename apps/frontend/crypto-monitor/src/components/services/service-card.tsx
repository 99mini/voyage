import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
}

export function ServiceCard({ title, description, features }: ServiceCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 tracking-normal">{title}</h2>
        <p className="text-foreground/60 mb-4 leading-relaxed">{description}</p>
        <ul className="list-disc list-inside space-y-2 text-foreground/60">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
