import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "./check-icon";

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
  buttonClassName?: string;
  className?: string;
}

export function PricingCard({
  title,
  description,
  price,
  features,
  buttonText,
  buttonClassName = "",
  className = "",
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-foreground/60">/month</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${buttonClassName}`}>{buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
