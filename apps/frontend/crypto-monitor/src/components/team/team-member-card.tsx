import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamMemberCardProps {
  name: string;
  role: string;
  description: string;
  image: string;
}

export function TeamMemberCard({ name, role, description, image }: TeamMemberCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
          <div className="bg-coral-100 w-full h-full flex items-center justify-center">
            <svg className="w-24 h-24 text-coral-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        <CardTitle className="text-xl mb-2">{name}</CardTitle>
        <p className="text-foreground/60 font-medium">{role}</p>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/60">{description}</p>
      </CardContent>
    </Card>
  );
}
