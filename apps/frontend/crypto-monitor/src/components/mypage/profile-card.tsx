import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">이메일</label>
          <p className="text-foreground/60">user@example.com</p>
        </div>
        <div>
          <label className="text-sm font-medium">가입일</label>
          <p className="text-foreground/60">2024년 1월 1일</p>
        </div>
        <Button variant="outline" className="w-full">
          프로필 수정
        </Button>
      </CardContent>
    </Card>
  );
}
