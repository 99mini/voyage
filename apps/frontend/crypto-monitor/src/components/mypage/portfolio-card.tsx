import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PortfolioCard() {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>포트폴리오 개요</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8 text-foreground/60">
          <p>포트폴리오 데이터가 없습니다.</p>
          <Button className="mt-4">자산 추가하기</Button>
        </div>
      </CardContent>
    </Card>
  );
}
